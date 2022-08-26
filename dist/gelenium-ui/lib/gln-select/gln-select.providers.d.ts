import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
/** Injection token that determines how scrolling is handled when the panel is open. */
export declare const GLN_SELECT_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
export declare function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_BLOCK_FACTORY(overlay: Overlay): () => ScrollStrategy;
export declare function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY(overlay: Overlay): () => ScrollStrategy;
export declare function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_NOOP_FACTORY(overlay: Overlay): () => ScrollStrategy;
export declare function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION_FACTORY(overlay: Overlay): () => ScrollStrategy;
export declare const GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: (typeof Overlay)[];
    useFactory: typeof GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION_FACTORY;
};
