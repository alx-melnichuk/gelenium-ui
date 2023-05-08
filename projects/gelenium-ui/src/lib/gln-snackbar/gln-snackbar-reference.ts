import { EmbeddedViewRef } from '@angular/core';

export class GlnSnackbarRef<T> {
  /** The instance of the component making up the content of the snack bar. */
  public instance!: T | EmbeddedViewRef<any>;
  /** A promise that is resolved when closed (by an action or close button) and rejected when closed by a timeout. */
  public readonly result: Promise<any>;
  private resolve!: (result: any) => void;

  constructor() {
    this.result = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  /** Closes the snack bar by clicking on the "action" or "close" button. */
  public close(resultAction?: any): void {
    this.resolve(resultAction);
  }
  /** Closes the snack bar when the timeout expires. */
  public dismiss(options?: { noAnimation?: boolean }): void {
    this.resolve(undefined);
  }
}

/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

export class GlnSnackbarReference<T> extends GlnSnackbarRef<T> {
  private hideWrapperFn: () => void = () => {};
  private removeWrapperFn: () => void = () => {};
  /** Identifier of the time to wait before closing (the result of calling setTimeout). */
  private timeoutId: number | undefined;

  constructor(public readonly id: number, public readonly duration: number | undefined | null) {
    super();
    if (!!this.duration && this.duration > 0) {
      this.timeoutId = window.setTimeout(() => this.dismiss(), Math.min(this.duration, MAX_TIMEOUT));
    }
  }

  public setHideWrapperFn = (fn: () => void): void => {
    this.hideWrapperFn = fn;
  };

  public setRemoveWrapperFn = (fn: () => void): void => {
    this.removeWrapperFn = fn;
  };

  public override close = (resultAction?: any): void => {
    this.clearTimeout();
    super.close(resultAction);
    this.hideWrapperFn();
  };

  public override dismiss = (options?: { noAnimation?: boolean }): void => {
    this.clearTimeout();
    super.dismiss(options);
    if (!options?.noAnimation) {
      this.hideWrapperFn();
    } else {
      this.removeWrapperFn();
    }
  };

  public getGlnSnackbarRef(): GlnSnackbarRef<T> {
    return {
      instance: this.instance,
      result: this.result,
      close: (resultAction?: any): void => this.close(resultAction),
      dismiss: (options?: { noAnimation?: boolean }): void => this.dismiss(options),
    } as GlnSnackbarRef<T>;
  }

  // ** Private methods **

  private clearTimeout(): void {
    if (undefined !== this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
