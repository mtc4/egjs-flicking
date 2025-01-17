/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/react-flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking/tree/master/packages/react-flicking
version: 4.11.2-snapshot
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('@egjs/component'), require('@egjs/list-differ'), require('@egjs/flicking'), require('react-dom')) :
    typeof define === 'function' && define.amd ? define(['react', '@egjs/component', '@egjs/list-differ', '@egjs/flicking', 'react-dom'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ReactFlicking = factory(global.React, global.Component, global.eg.ListDiffer, global.Flicking, global.ReactDOM));
})(this, (function (React, Component, ListDiffer, VanillaFlicking, reactDom) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
      return extendStatics(d, b);
    };
    function __extends(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    }

    var DEFAULT_PROPS = {
      viewportTag: "div",
      cameraTag: "div",
      cameraClass: "",
      renderOnSameKey: false,
      plugins: [],
      useFindDOMNode: false,
      hideBeforeInit: false,
      onReady: function (e) {},
      onBeforeResize: function (e) {},
      onAfterResize: function (e) {},
      onHoldStart: function (e) {},
      onHoldEnd: function (e) {},
      onMoveStart: function (e) {},
      onMove: function (e) {},
      onMoveEnd: function (e) {},
      onWillChange: function (e) {},
      onChanged: function (e) {},
      onWillRestore: function (e) {},
      onRestored: function (e) {},
      onSelect: function (e) {},
      onNeedPanel: function (e) {},
      onVisibleChange: function (e) {},
      onReachEdge: function (e) {},
      onPanelChange: function (e) {}
    };

    var ReactRenderer = /*#__PURE__*/function (_super) {
      __extends(ReactRenderer, _super);
      function ReactRenderer(options) {
        var _this = _super.call(this, options) || this;
        _this._reactFlicking = options.reactFlicking;
        return _this;
      }
      // eslint-disable-next-line @typescript-eslint/require-await
      var __proto = ReactRenderer.prototype;
      __proto.render = function () {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, reactFlicking, strategy;
          var _this = this;
          return __generator(this, function (_a) {
            flicking = VanillaFlicking.getFlickingAttached(this._flicking);
            reactFlicking = this._reactFlicking;
            strategy = this._strategy;
            this._rendering = true;
            strategy.updateRenderingPanels(flicking);
            strategy.renderPanels(flicking);
            return [2 /*return*/, new Promise(function (resolve) {
              reactFlicking.renderEmitter.once("render", function () {
                _this._rendering = false;
                _this._afterRender();
                resolve();
              });
              reactFlicking.forceUpdate();
            })];
          });
        });
      };
      __proto.forceRenderAllPanels = function () {
        return __awaiter(this, void 0, void 0, function () {
          var reactFlicking;
          var _this = this;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                reactFlicking = this._reactFlicking;
                this._rendering = true;
                return [4 /*yield*/, _super.prototype.forceRenderAllPanels.call(this)];
              case 1:
                _a.sent();
                return [2 /*return*/, new Promise(function (resolve) {
                  reactFlicking.renderEmitter.once("render", function () {
                    _this._rendering = false;
                    resolve();
                  });
                  reactFlicking.forceUpdate();
                })];
            }
          });
        });
      };
      __proto.destroy = function () {
        _super.prototype.destroy.call(this);
        this._reactFlicking.renderEmitter.off("render");
      };
      __proto._collectPanels = function () {
        var flicking = VanillaFlicking.getFlickingAttached(this._flicking);
        var reactFlicking = this._reactFlicking;
        var reactPanels = reactFlicking.reactPanels;
        this._panels = this._strategy.collectPanels(flicking, reactPanels);
      };
      __proto._createPanel = function (externalComponent, options) {
        return this._strategy.createPanel(externalComponent, options);
      };
      return ReactRenderer;
    }(VanillaFlicking.ExternalRenderer);

    var StrictPanel = /*#__PURE__*/function (_super) {
      __extends(StrictPanel, _super);
      function StrictPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._hide = false;
        _this._elRef = React.createRef();
        return _this;
      }
      var __proto = StrictPanel.prototype;
      Object.defineProperty(__proto, "nativeElement", {
        get: function () {
          return this._elRef.current;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "rendered", {
        get: function () {
          return !this._hide;
        },
        enumerable: false,
        configurable: true
      });
      __proto.render = function () {
        return this._hide ? React.createElement(React.Fragment, null) : this._getElement();
      };
      __proto.show = function () {
        this._hide = false;
      };
      __proto.hide = function () {
        this._hide = true;
      };
      __proto._getElement = function () {
        return React.cloneElement(React.Children.only(this.props.children), {
          ref: this._elRef
        });
      };
      return StrictPanel;
    }(React.Component);

    var NonStrictPanel = /*#__PURE__*/function (_super) {
      __extends(NonStrictPanel, _super);
      function NonStrictPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._hide = false;
        return _this;
      }
      var __proto = NonStrictPanel.prototype;
      Object.defineProperty(__proto, "nativeElement", {
        get: function () {
          return reactDom.findDOMNode(this);
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "rendered", {
        get: function () {
          return !this._hide;
        },
        enumerable: false,
        configurable: true
      });
      __proto.render = function () {
        return this._hide ? React.createElement(React.Fragment, null) : this.props.children;
      };
      __proto.show = function () {
        this._hide = false;
      };
      __proto.hide = function () {
        this._hide = true;
      };
      return NonStrictPanel;
    }(React.Component);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    var ViewportSlot = React.memo(function (props) {
      return React.createElement(React.Fragment, null, props.children);
    });

    var ReactElementProvider = /*#__PURE__*/function () {
      function ReactElementProvider(el) {
        this._el = el;
      }
      var __proto = ReactElementProvider.prototype;
      Object.defineProperty(__proto, "element", {
        get: function () {
          return this._el.nativeElement;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "rendered", {
        get: function () {
          return this._el.rendered;
        },
        enumerable: false,
        configurable: true
      });
      __proto.show = function () {
        this._el.show();
      };
      __proto.hide = function () {
        this._el.hide();
      };
      return ReactElementProvider;
    }();

    var Flicking = /*#__PURE__*/function (_super) {
      __extends(Flicking, _super);
      function Flicking(props) {
        var _this = _super.call(this, props) || this;
        _this._panels = [];
        _this._renderEmitter = new Component();
        var children = _this._getChildren();
        _this._panels = _this._createPanelRefs(props, children);
        _this._prevChildren = children;
        return _this;
      }
      var __proto = Flicking.prototype;
      Object.defineProperty(__proto, "reactPanels", {
        get: function () {
          return this._panels.map(function (panel) {
            return panel.current;
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderEmitter", {
        get: function () {
          return this._renderEmitter;
        },
        enumerable: false,
        configurable: true
      });
      __proto.componentDidMount = function () {
        var props = this.props;
        var rendererOptions = {
          reactFlicking: this,
          align: props.align,
          strategy: props.virtual && props.panelsPerView > 0 ? new VanillaFlicking.VirtualRenderingStrategy() : new VanillaFlicking.NormalRenderingStrategy({
            providerCtor: ReactElementProvider
          })
        };
        var flicking = new VanillaFlicking(this._viewportElement, __assign(__assign({}, props), {
          externalRenderer: new ReactRenderer(rendererOptions)
        }));
        this._vanillaFlicking = flicking;
        var children = this._getChildren();
        this._jsxDiffer = new ListDiffer(children, function (panel) {
          return panel.key;
        });
        this._pluginsDiffer = new ListDiffer();
        this._prevChildren = children;
        this._bindEvents();
        this._checkPlugins();
        if (props.status) {
          flicking.setStatus(props.status);
        }
      };
      __proto.componentWillUnmount = function () {
        var _a;
        (_a = this._vanillaFlicking) === null || _a === void 0 ? void 0 : _a.destroy();
      };
      __proto.shouldComponentUpdate = function (nextProps) {
        var vanillaFlicking = this._vanillaFlicking;
        var prevProps = this.props;
        if (!vanillaFlicking || !vanillaFlicking.initialized) return false;
        var children = nextProps.children,
          restProps = __rest(nextProps, ["children"]);
        for (var key in restProps) {
          if (prevProps[key] !== nextProps[key]) {
            return true;
          }
        }
        var prevChildren = this._prevChildren;
        var nextChildren = this._getChildren(children);
        if (nextProps.renderOnSameKey || !this._hasSameChildren(prevChildren, nextChildren)) return true;
        return false;
      };
      __proto.beforeRender = function () {
        var vanillaFlicking = this._vanillaFlicking;
        var props = this.props;
        var prevChildren = this._prevChildren;
        // Ignore updates before init, they will be updated after "ready" event's force update
        // Also, prevent updates when another update is already queued.
        // This usually happens when render() called twice without calling componentDidMount, like in the case of React.StrictMode.
        if (!vanillaFlicking || !vanillaFlicking.initialized || this._diffResult) return;
        var nextChildren = this._getChildren(props.children);
        if (props.renderOnSameKey || !this._hasSameChildren(prevChildren, nextChildren)) {
          this._panels = this._createPanelRefs(props, nextChildren);
          this._diffResult = this._jsxDiffer.update(nextChildren);
          this._prevChildren = nextChildren;
        }
      };
      __proto.componentDidUpdate = function () {
        var flicking = this._vanillaFlicking;
        var renderEmitter = this._renderEmitter;
        var diffResult = this._diffResult;
        this._checkPlugins();
        renderEmitter.trigger("render");
        flicking.camera.updateOffset();
        // Omit 'virtual', as it can't have any setter
        var _a = this.props;
          _a.virtual;
          var props = __rest(_a, ["virtual"]);
        for (var key in props) {
          if (key in flicking && flicking[key] !== props[key]) {
            flicking[key] = props[key];
          }
        }
        if (!diffResult || !flicking.initialized) return;
        VanillaFlicking.sync(flicking, diffResult, this.reactPanels);
        this._diffResult = null;
      };
      __proto.render = function () {
        var _this = this;
        var _a, _b;
        var props = this.props;
        var Viewport = props.viewportTag;
        var Camera = props.cameraTag;
        var attributes = {};
        var flicking = this._vanillaFlicking;
        this.beforeRender();
        for (var name in props) {
          if (!(name in DEFAULT_PROPS) && !(name in VanillaFlicking.prototype)) {
            attributes[name] = props[name];
          }
        }
        var initialized = flicking && flicking.initialized;
        var viewportClasses = ["flicking-viewport"];
        var cameraClasses = ["flicking-camera"];
        var isHorizontal = flicking ? flicking.horizontal : (_a = props.horizontal) !== null && _a !== void 0 ? _a : true;
        if (!isHorizontal) {
          viewportClasses.push("vertical");
        }
        if (props.hideBeforeInit && !initialized) {
          viewportClasses.push("flicking-hidden");
        }
        if (attributes.className) {
          viewportClasses.push(attributes.className);
        }
        if (props.cameraClass) {
          cameraClasses.push(props.cameraClass);
        }
        var cameraProps = !initialized && props.firstPanelSize ? {
          style: {
            transform: VanillaFlicking.getDefaultCameraTransform(this.props.align, this.props.horizontal, this.props.firstPanelSize)
          }
        } : {};
        var panels = !!props.virtual && ((_b = props.panelsPerView) !== null && _b !== void 0 ? _b : -1) > 0 ? this._getVirtualPanels() : this._getPanels();
        return React.createElement(Viewport, __assign({}, attributes, {
          className: viewportClasses.join(" "),
          ref: function (e) {
            e && (_this._viewportElement = e);
          }
        }), React.createElement(Camera, __assign({
          className: cameraClasses.join(" ")
        }, cameraProps), panels), this._getViewportSlot());
      };
      __proto._createPanelRefs = function (props, children) {
        var _a;
        var panelsPerView = (_a = props.panelsPerView) !== null && _a !== void 0 ? _a : -1;
        return panelsPerView > 0 && !!props.virtual ? VanillaFlicking.range(panelsPerView + 1).map(function () {
          return React.createRef();
        }) : children.map(function () {
          return React.createRef();
        });
      };
      __proto._bindEvents = function () {
        var _this = this;
        var flicking = this._vanillaFlicking;
        Object.keys(VanillaFlicking.EVENTS).forEach(function (eventKey) {
          var eventName = VanillaFlicking.EVENTS[eventKey];
          var propName = "on".concat(eventName.charAt(0).toUpperCase() + eventName.slice(1));
          flicking.on(eventName, function (e) {
            e.currentTarget = _this;
            var evtHandler = _this.props[propName];
            evtHandler(e);
          });
        });
        flicking.once(VanillaFlicking.EVENTS.READY, function () {
          _this.forceUpdate();
        });
      };
      __proto._checkPlugins = function () {
        var flicking = this._vanillaFlicking;
        var _a = this._pluginsDiffer.update(this.props.plugins),
          list = _a.list,
          added = _a.added,
          removed = _a.removed,
          prevList = _a.prevList;
        flicking.addPlugins.apply(flicking, added.map(function (index) {
          return list[index];
        }));
        flicking.removePlugins.apply(flicking, removed.map(function (index) {
          return prevList[index];
        }));
      };
      __proto._hasSameChildren = function (prevChildren, nextChildren) {
        if (prevChildren.length !== nextChildren.length || prevChildren.length === 0) return false;
        var same = prevChildren.every(function (child, idx) {
          var nextChild = nextChildren[idx];
          if (child.key && nextChild.key) {
            return child.key === nextChild.key;
          } else {
            return child === nextChild;
          }
        });
        return same;
      };
      __proto._getChildren = function (children) {
        var _this = this;
        if (children === void 0) {
          children = this.props.children;
        }
        return React.Children.toArray(children).filter(function (child) {
          return child.type !== ViewportSlot;
        }).reduce(function (all, child) {
          return __spreadArray(__spreadArray([], all, true), _this._unpackFragment(child), true);
        }, []);
      };
      __proto._getViewportSlot = function () {
        return React.Children.toArray(this.props.children).filter(function (child) {
          return child.type === ViewportSlot;
        });
      };
      __proto._unpackFragment = function (child) {
        var _this = this;
        return this._isFragment(child) ? React.Children.toArray(child.props.children).reduce(function (allChilds, fragChild) {
          return __spreadArray(__spreadArray([], allChilds, true), _this._unpackFragment(fragChild), true);
        }, []) : [child];
      };
      __proto._getVirtualPanels = function () {
        var _this = this;
        var _a = this.props.virtual.panelClass,
          panelClass = _a === void 0 ? "flicking-panel" : _a;
        var panelsPerView = this.props.panelsPerView;
        var flicking = this._vanillaFlicking;
        var initialized = flicking && flicking.initialized;
        var renderingIndexes = initialized ? flicking.renderer.strategy.getRenderingIndexesByOrder(flicking) : VanillaFlicking.range(panelsPerView + 1);
        var firstPanel = flicking && flicking.panels[0];
        var size = firstPanel ? flicking.horizontal ? {
          width: firstPanel.size
        } : {
          height: firstPanel.size
        } : {};
        return renderingIndexes.map(function (idx) {
          return React.createElement("div", {
            key: idx,
            "data-element-index": idx,
            ref: _this._panels[idx],
            className: panelClass,
            style: size
          });
        });
      };
      __proto._getPanels = function () {
        var _this = this;
        var origChildren = this._getChildren();
        var vanillaFlicking = this._vanillaFlicking;
        var diffResult = this._diffResult;
        var children = vanillaFlicking && vanillaFlicking.initialized ? diffResult ? VanillaFlicking.getRenderingPanels(vanillaFlicking, diffResult) : VanillaFlicking.getRenderingPanels(vanillaFlicking, ListDiffer.diff(origChildren, origChildren)) : origChildren;
        return this.props.useFindDOMNode ? children.map(function (child, idx) {
          return React.createElement(NonStrictPanel, {
            key: child.key,
            ref: _this._panels[idx]
          }, child);
        }) : children.map(function (child, idx) {
          return React.createElement(StrictPanel, {
            key: child.key,
            ref: _this._panels[idx]
          }, child);
        });
      };
      __proto._isFragment = function (child) {
        if (child.type) {
          return child.type === React.Fragment;
        }
        return child === React.Fragment;
      };
      Flicking.defaultProps = DEFAULT_PROPS;
      __decorate([VanillaFlicking.withFlickingMethods], Flicking.prototype, "_vanillaFlicking", void 0);
      return Flicking;
    }(React.Component);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    Flicking.ViewportSlot = ViewportSlot;

    return Flicking;

}));
//# sourceMappingURL=flicking.umd.js.map
