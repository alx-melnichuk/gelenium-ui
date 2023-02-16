import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

/** Injection token that determines how scrolling is handled when the panel is open. */
export const GLN_SELECT_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('GLN_SELECT_SCROLL_STRATEGY');

export function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_BLOCK_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}
export function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.close();
}
export function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_NOOP_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.noop();
}
export function GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

export const GLN_SELECT_SCROLL_STRATEGY_PROVIDER_CLOSE = {
  provide: GLN_SELECT_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: GLN_SELECT_SCROLL_STRATEGY_PROVIDER_CLOSE_FACTORY,
};
