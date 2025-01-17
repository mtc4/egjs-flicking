export { CODE as ERROR_CODE } from "./error";
export declare const EVENTS: {
    readonly READY: "ready";
    readonly BEFORE_RESIZE: "beforeResize";
    readonly AFTER_RESIZE: "afterResize";
    readonly HOLD_START: "holdStart";
    readonly HOLD_END: "holdEnd";
    readonly MOVE_START: "moveStart";
    readonly MOVE: "move";
    readonly MOVE_END: "moveEnd";
    readonly WILL_CHANGE: "willChange";
    readonly CHANGED: "changed";
    readonly WILL_RESTORE: "willRestore";
    readonly RESTORED: "restored";
    readonly SELECT: "select";
    readonly NEED_PANEL: "needPanel";
    readonly VISIBLE_CHANGE: "visibleChange";
    readonly REACH_EDGE: "reachEdge";
    readonly PANEL_CHANGE: "panelChange";
};
export declare const ALIGN: {
    readonly PREV: "prev";
    readonly CENTER: "center";
    readonly NEXT: "next";
};
export declare const DIRECTION: {
    readonly PREV: "PREV";
    readonly NEXT: "NEXT";
    readonly NONE: any;
};
export declare const MOVE_TYPE: {
    readonly SNAP: "snap";
    readonly FREE_SCROLL: "freeScroll";
    readonly STRICT: "strict";
};
export declare const CLASS: {
    VERTICAL: string;
    HIDDEN: string;
    DEFAULT_VIRTUAL: string;
};
export declare const CIRCULAR_FALLBACK: {
    readonly LINEAR: "linear";
    readonly BOUND: "bound";
};
export declare const ORDER: {
    readonly LTR: "ltr";
    readonly RTL: "rtl";
};
