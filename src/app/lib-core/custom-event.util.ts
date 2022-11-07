export type CustomEventType = (value?: any) => void;

/** The static class is designed to pass user events within the application. */
export class CustomEventUtil {
  private static handlerEventMap: Map<string, Array<CustomEventType>> = new Map();
  /** Add a custom event handler. */
  public static add(keyEvent: string, handlerEvent: CustomEventType): void {
    CustomEventUtil.remove(keyEvent, handlerEvent);
    if (!CustomEventUtil.handlerEventMap.has(keyEvent)) {
      CustomEventUtil.handlerEventMap.set(keyEvent, []);
    }
    const customEvenBuff: Array<CustomEventType> | undefined = CustomEventUtil.handlerEventMap.get(keyEvent);
    customEvenBuff?.push(handlerEvent);
  }
  /** Remove a custom event handler. */
  public static remove(keyEvent: string, handlerEvent: CustomEventType): void {
    const customEvenBuff: Array<CustomEventType> | undefined = CustomEventUtil.handlerEventMap.get(keyEvent);
    if (customEvenBuff != null) {
      const index1: number = customEvenBuff.indexOf(handlerEvent);
      if (index1 != -1) {
        customEvenBuff.splice(index1, 1);
        if (customEvenBuff.length === 0) {
          CustomEventUtil.handlerEventMap.delete(keyEvent);
        }
      }
    }
  }
  /** Invoke custom event handling. */
  public static emit(keyEvent: string, argument?: any): void {
    const customEvenBuff: Array<CustomEventType> | undefined = CustomEventUtil.handlerEventMap.get(keyEvent);
    if (customEvenBuff != null) {
      for (let idx = 0; idx < customEvenBuff.length; idx++) {
        Promise.resolve().then(() => {
          customEvenBuff[idx](argument);
        });
      }
    }
  }
}
