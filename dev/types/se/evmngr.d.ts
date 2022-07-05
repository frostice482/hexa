export default class eventManager<T extends Record<string, any>> {
    readonly events: {
        [K in keyof T]: {
            subscribe: <callback extends fnCallback<T[K]>>(callback: callback, priority?: number) => callback;
            unsubscribe: <callback extends fnCallback<T[K]>>(callback: callback) => boolean;
        };
    };
    readonly triggerEvent: {
        [K in keyof T]: (eventData: T[K], ctrl?: controlEvents) => eventControlDataBind;
    };
    readonly data: {
        [K in keyof T]: {
            list: Map<fnCallback<T[K]>, number>;
            cached: boolean;
        };
    };
    constructor(eventKeys: (keyof T)[], name?: string);
}
export declare class eventControl {
    break: (reason?: any) => void;
    constructor(dataBind: eventControlDataBind, ctrl?: controlEvents);
}
declare type eventControlDataBind = {
    break: boolean;
    breakReason?: any;
};
declare type controlEvents = {
    onBreak?: (evd: controlOnBreakEvent) => void;
    onError?: (evd: triggerOnErrorEvent) => void;
};
declare type controlOnBreakEvent = {
    cancel: boolean;
    readonly reason?: any;
};
declare type triggerOnErrorEvent = {
    break: boolean;
    log: boolean;
    readonly reason: any;
};
declare type fnCallback<T> = (evd: T, control: eventControl) => any;
export {};
