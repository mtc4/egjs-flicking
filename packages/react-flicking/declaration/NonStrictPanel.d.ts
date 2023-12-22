import * as React from "react";
declare class NonStrictPanel extends React.Component<{
    children?: React.ReactElement;
}> {
    private _hide;
    get nativeElement(): HTMLElement;
    get rendered(): boolean;
    render(): import("react/jsx-runtime").JSX.Element | undefined;
    show(): void;
    hide(): void;
}
export default NonStrictPanel;
