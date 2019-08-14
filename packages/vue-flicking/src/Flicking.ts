/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import NativeFlicking, { Plugin, FlickingOptions, DestroyOption, withFlickingMethods, DEFAULT_OPTIONS, FlickingPanel } from "../../../src/index";
import ChildrenDiffer from "@egjs/vue-children-differ";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNodeData, VNode } from "vue";
import { counter } from "./utils";

@Component({
  name: "Flicking",
  directives: {
    "children-differ": ChildrenDiffer,
  },
})
export default class Flicking extends Vue {
  // Tag of wrapper element
  @Prop({ type: String, default: "div", required: false }) tag!: string;
  @Prop({ type: Object, default: () => ({}), required: false }) options!: Partial<FlickingOptions>;
  @Prop({ type: Array, default: () => ([]), required: false }) plugins!: Plugin[];

  // Following decorator will inject native Flicking's method into Vue-Flicking
  @withFlickingMethods
  private $_nativeFlicking!: NativeFlicking;
  private $_pluginsDiffer!: ListDiffer<Plugin>;
  private $_cloneCount!: number;
  private $_slotDiffer!: ListDiffer<VNode>;
  private $_slotDiffResult: DiffResult<VNode> | undefined;
  private $_visibleIndex!: { min: number; max: number };

  public mounted() {
    this.$_pluginsDiffer = new ListDiffer<Plugin>();
    this.$_cloneCount = 0;
    this.$_visibleIndex = { min: NaN, max: NaN };

    this.options.renderOnlyVisible = true;
    const options = {...this.options, ...{ renderExternal: true }};
    this.$_nativeFlicking = new NativeFlicking(this.$el as HTMLElement, options);
    this.$_slotDiffer = new ListDiffer<VNode>(this.$slots.default, (vnode, idx) => vnode.key || idx);

    this.$_bindEvents();
    this.$_checkUpdate();

    if (this.options.renderOnlyVisible) {
      // Should update once to update visibles
      const visibleIndex = this.$_nativeFlicking.getVisibleIndex();
      this.$_visibleIndex = {
        min: visibleIndex.min,
        max: visibleIndex.max,
      };
      this.$forceUpdate();
    }
  }

  public beforeUpdate() {
    if (!this.$slots.default) {
      return;
    }

    this.$slots.default = this.$slots.default.map((node, index) => {
      if (node.key == null) {
        node.key = `${node.tag}-${index}`;
      }
      return node;
    });
  }

  public beforeDestroy() {
    this.destroy({ preserveUI: true });
  }

  public render(h: CreateElement) {
    const classPrefix = this.options.classPrefix || DEFAULT_OPTIONS.classPrefix;
    const viewportData: VNodeData = {
      class: {},
    };
    const cameraData: VNodeData = {
      class: {},
      directives: [{ name: "children-differ", value: this.onUpdate.bind(this) }],
    };
    viewportData.class[`${classPrefix}-viewport`] = true;
    cameraData.class[`${classPrefix}-camera`] = true;

    const panels = this.$_getPanels(h);

    return h(this.tag,
      [h("div", viewportData,
        [h("div", cameraData,
          panels,
        )],
      )],
    );
  }

  public onUpdate(diffResult: DiffResult<HTMLElement>) {
    const flicking = this.$_nativeFlicking;
    const prevCloneCount = this.$_cloneCount;
    const newCloneCount = flicking.getCloneCount();

    this.$_nativeFlicking.sync(diffResult, this.$_slotDiffResult, prevCloneCount);
    this.$_cloneCount = newCloneCount;
    this.$_slotDiffResult = undefined;
    this.$nextTick(() => {
      this.$_checkUpdate();
    });
  }

  // overrides
  public destroy(option: Partial<DestroyOption> = {}) {
    this.$_nativeFlicking.destroy(option);
  }

  private $_checkUpdate() {
    this.$_checkPlugins();
    this.$_checkCloneCount();
  }

  private $_bindEvents() {
    const events = Object.keys(NativeFlicking.EVENTS)
      .map(key => NativeFlicking.EVENTS[key]);

    events.forEach(eventName => {
      this.$_nativeFlicking.on(eventName, e => {
        e.currentTarget = this;
        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });

    if (this.options.renderOnlyVisible) {
      this.$_nativeFlicking.on(NativeFlicking.EVENTS.VISIBLE_CHANGE, e => {
        this.$_visibleIndex.min = e.range.min;
        this.$_visibleIndex.max = e.range.max;
        this.$forceUpdate();
      });
    }
  }

  private $_checkPlugins() {
    const { list, added, removed, prevList } = this.$_pluginsDiffer.update(this.plugins);

    this.$_nativeFlicking.addPlugins(added.map(index => list[index]));
    this.$_nativeFlicking.removePlugins(removed.map(index => prevList[index]));
  }

  private $_checkCloneCount(): void {
    const prevCloneCount = this.$_cloneCount;
    const newCloneCount = this.$_nativeFlicking.getCloneCount();

    if (prevCloneCount !== newCloneCount) {
      this.$forceUpdate();
    }
  }

  private $_getPanels(h: CreateElement) {
    const flicking = this.$_nativeFlicking;
    const slots = this.$slots.default;

    if (!slots) {
      return [];
    }

    const oldCloneCount = this.$_cloneCount;
    const newCloneCount = flicking
      ? flicking.getCloneCount()
      : 0;

    const lastIndex = flicking
      ? flicking.getLastIndex()
      : this.options.lastIndex || DEFAULT_OPTIONS.lastIndex;

    let panels: VNode[];

    if (this.options.renderOnlyVisible && this.$_slotDiffer) {
      this.$_slotDiffResult = this.$_slotDiffer.update(slots);

      const slotsDiff = this.$_slotDiffResult;
      const panelCnt = flicking.getPanelCount();
      const visibleIndex = this.$_visibleIndex;

      const visibles = counter(visibleIndex.max - visibleIndex.min + 1).map(offset => {
        const index = visibleIndex.min + offset;
        let node: VNode;
        if (index < 0) {
          const relativeIndex = panelCnt + ((index + 1) % panelCnt - 1);
          const cloneIndex = newCloneCount - ((index + 1) % panelCnt + 1);
          const origSlot = slots[relativeIndex];

          node = this.$_cloneVNode(origSlot, h, cloneIndex, relativeIndex);
        } else if (index >= panelCnt) {
          const relativeIndex = index % panelCnt;
          const origSlot = slots[relativeIndex];

          node = this.$_cloneVNode(origSlot, h, Math.floor(index / panelCnt) - 1, relativeIndex);
        } else {
          node = slots[index];
        }

        return node;
      });

      const added = slotsDiff.added.map(addedIndex => slots[addedIndex]);

      const addedClones = counter(oldCloneCount).reduce((clones: VNode[], cloneIndex) => {
        const newAddedClones = slotsDiff.added.map(addedIdx => {
          const child = slots[addedIdx];

          return this.$_cloneVNode(child, h, cloneIndex, addedIdx);
        });
        return [...clones, ...newAddedClones];
      }, []);

      const newClones = counter(newCloneCount - oldCloneCount).reduce((clones: VNode[], idxOffset) => {
        const cloneIndex = oldCloneCount + idxOffset;
        const childs = slots.map((slot, slotIndex) => {
          return this.$_cloneVNode(slot, h, cloneIndex, slotIndex);
        });

        return [...clones, ...childs];
      }, []);

      panels = [...visibles, ...added, ...addedClones, ...newClones];
    } else {
      panels = [...slots.slice(0, lastIndex + 1), ...this.$_getClonedVNodes()];
    }

    return panels;
  }

  private $_getClonedVNodes() {
    const h = this.$createElement;
    const cloneCount = this.$_nativeFlicking
      ? this.$_nativeFlicking.getCloneCount()
      : 0;
    const lastIndex = this.$_nativeFlicking
      ? this.$_nativeFlicking.getLastIndex()
      : this.options.lastIndex || DEFAULT_OPTIONS.lastIndex;
    const children = this.$slots.default!.slice(0, lastIndex + 1);
    const clones: VNode[] = [];

    for (let cloneIndex = 0; cloneIndex < cloneCount; cloneIndex++) {
      clones.push(...children.map((child, childIdx) => this.$_cloneVNode(child, h, cloneIndex, childIdx)));
    }
    return clones;
  }

  private $_cloneVNode(vnode: VNode, h: CreateElement, cloneIndex?: number, childIndex?: number): VNode {
    const key = cloneIndex != null
      ? `clone${cloneIndex}-${vnode.key ? vnode.key : childIndex}`
      : undefined;
    const clonedChilds = vnode.children
      ? vnode.children.map(child => this.$_cloneVNode(child, h))
      : undefined;
    const clone = h(vnode.tag, vnode.data, clonedChilds);
    clone.text = vnode.text;
    clone.isComment = vnode.isComment;
    clone.componentOptions = vnode.componentOptions;
    clone.context = vnode.context;
    clone.ns = vnode.ns;
    clone.isStatic = vnode.isStatic;
    clone.key = key;

    return clone;
  }

  private $_getPanelFromRelativeIndex(index: number, allPanels: FlickingPanel[]) {
    index = index < 0
      ? allPanels.length + index
      : index;
    return allPanels[index];
  }
}
