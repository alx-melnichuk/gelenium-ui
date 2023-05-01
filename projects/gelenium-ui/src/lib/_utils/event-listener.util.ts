import { normalizePassiveListenerOptions } from '@angular/cdk/platform';

export type EventListenerType = readonly [Element, string, EventListenerOrEventListenerObject];

export class EventListenerUtil {
  /** Add event listeners from the list. */
  public static addListeners(listeners: EventListenerType[], options?: boolean | AddEventListenerOptions | undefined): void {
    EventListenerUtil.activityListeners(true, listeners, options);
  }
  /** Remove event listeners from the list. */
  public static removeListeners(listeners: EventListenerType[], options?: boolean | AddEventListenerOptions | undefined): void {
    EventListenerUtil.activityListeners(false, listeners, options);
  }
  /** Add/Remove event listeners from the list. */
  public static activityListeners(
    isActivity: boolean,
    listeners: EventListenerType[],
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    const optionsValue: boolean | AddEventListenerOptions | undefined = options || normalizePassiveListenerOptions({ passive: true });
    for (let idx = 0; idx < listeners.length; idx++) {
      const [element, event, listener] = listeners[idx];
      if (isActivity) {
        element?.addEventListener(event, listener, options || optionsValue);
      } else {
        element?.removeEventListener(event, listener, options || optionsValue);
      }
    }
  }
}
