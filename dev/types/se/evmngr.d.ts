export default class eventManager<T extends MappedEventList> {
    readonly events: {
        [K in keyof T]: {
            subscribe: (callback: T[K], priority?: number) => void;
            unsubscribe: (callback: T[K]) => boolean;
        };
    };
    readonly triggerEvent: {
        [K in keyof T]: (eventData: Parameters<T[K]>[0], ctrl?: controlEvents) => eventControlDataBind;
    };
    readonly data: {
        [K in keyof T]: {
            list: Map<T[K], number>;
            cached: boolean;
        };
    };
    constructor(eventKeys: (keyof T)[], name?: string);
}
export class eventControl {
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
declare type EventList = Record<string, (eventData: any) => void>;
export declare type MapEventList<T extends EventList> = {
    [K in keyof T]: (eventData: Parameters<T[K]>[0], control: eventControl) => void;
};
declare type MappedEventList = Record<string, (eventData: any, control: eventControl) => void>;
export {};
