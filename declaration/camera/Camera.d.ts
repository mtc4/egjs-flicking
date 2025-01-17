import Flicking, { FlickingOptions } from "../Flicking";
import Panel from "../core/panel/Panel";
import AnchorPoint from "../core/AnchorPoint";
import { ValueOf } from "../type/internal";
import { CameraMode } from "./mode";
export interface CameraOptions {
    align: FlickingOptions["align"];
}
declare class Camera {
    private _align;
    private _flicking;
    private _mode;
    private _el;
    private _transform;
    private _position;
    private _alignPos;
    private _offset;
    private _circularOffset;
    private _circularEnabled;
    private _range;
    private _visiblePanels;
    private _anchors;
    private _needPanelTriggered;
    private _panelOrder;
    get element(): HTMLElement;
    get children(): HTMLElement[];
    get position(): number;
    get alignPosition(): number;
    get offset(): number;
    get circularEnabled(): boolean;
    get mode(): CameraMode;
    get range(): {
        min: number;
        max: number;
    };
    get rangeDiff(): number;
    get visiblePanels(): Panel[];
    get visibleRange(): {
        min: number;
        max: number;
    };
    get anchorPoints(): AnchorPoint[];
    get controlParams(): {
        range: {
            min: number;
            max: number;
        };
        position: number;
        circular: boolean;
    };
    get atEdge(): boolean;
    get size(): number;
    get progress(): number;
    get panelOrder(): ValueOf<{
        readonly LTR: "ltr";
        readonly RTL: "rtl";
    }>;
    get align(): FlickingOptions["align"];
    set align(val: FlickingOptions["align"]);
    constructor(flicking: Flicking, { align }?: Partial<CameraOptions>);
    init(): this;
    destroy(): this;
    lookAt(pos: number): void;
    getPrevAnchor(anchor: AnchorPoint): AnchorPoint | null;
    getNextAnchor(anchor: AnchorPoint): AnchorPoint | null;
    getProgressInPanel(panel: Panel): number;
    findAnchorIncludePosition(position: number): AnchorPoint | null;
    findNearestAnchor(position: number): AnchorPoint | null;
    findActiveAnchor(): AnchorPoint | null;
    clampToReachablePosition(position: number): number;
    canReach(panel: Panel): boolean;
    canSee(panel: Panel): boolean;
    updateRange(): this;
    updateAlignPos(): this;
    updateAnchors(): this;
    updateAdaptiveHeight(): void;
    updateOffset(): this;
    updatePanelOrder(): this;
    resetNeedPanelHistory(): this;
    applyTransform(): this;
    private _resetInternalValues;
    private _refreshVisiblePanels;
    private _checkNeedPanel;
    private _checkReachEnd;
    private _checkTranslateSupport;
    private _updateMode;
    private _togglePanels;
}
export default Camera;
