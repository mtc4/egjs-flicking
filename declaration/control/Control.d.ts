import { OnRelease } from "@egjs/axes";
import Flicking from "../Flicking";
import Panel from "../core/panel/Panel";
import AxesController from "../control/AxesController";
import { DIRECTION } from "../const/external";
import { ValueOf } from "../type/internal";
declare abstract class Control {
    protected _flicking: Flicking | null;
    protected _controller: AxesController;
    protected _activePanel: Panel | null;
    protected _nextPanel: Panel | null;
    get controller(): AxesController;
    get activeIndex(): number;
    get activePanel(): Panel;
    get animating(): boolean;
    get holding(): boolean;
    constructor();
    abstract moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void>;
    init(flicking: Flicking): this;
    destroy(): void;
    enable(): this;
    disable(): this;
    release(): this;
    updateAnimation(panel: Panel, duration?: number, direction?: ValueOf<typeof DIRECTION>): this;
    stopAnimation(): this;
    updatePosition(progressInPanel: number): void;
    updateInput(): this;
    resetActive(): this;
    moveToPanel(panel: Panel, { duration, direction, axesEvent }: {
        duration: number;
        direction?: ValueOf<typeof DIRECTION>;
        axesEvent?: OnRelease;
    }): Promise<void>;
    setActive(newActivePanel: Panel, prevActivePanel: Panel | null, isTrusted: boolean): void;
    copy(control: Control): void;
    protected _triggerIndexChangeEvent(panel: Panel, position: number, axesEvent?: OnRelease): void;
    protected _animateToPosition({ position, duration, newActivePanel, axesEvent }: {
        position: number;
        duration: number;
        newActivePanel: Panel;
        axesEvent?: OnRelease;
    }): Promise<void>;
    private _getPosition;
}
export default Control;
