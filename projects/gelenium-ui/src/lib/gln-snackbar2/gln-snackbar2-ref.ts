import { EmbeddedViewRef } from '@angular/core';

export interface GlnSnackbar2Ref<T> {
  instance: T | EmbeddedViewRef<any>;
  readonly result: Promise<any>;
  close(resultAction?: any): void;
  dismiss(options?: { noAnimation?: boolean }): void;
}

/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

export class GlnSnackbar2Reference<T> {
  /** The instance of the component making up the content of the snack bar. */
  public instance!: T;

  /** A promise that is resolved when closed (by an action or close button) and rejected when closed by a timeout. */
  public readonly result: Promise<any>;

  private hideWrapperFn: () => void = () => {};
  private removeWrapperFn: () => void = () => {};
  private resolve: (result: any) => void = () => {};
  private reject: (reason?: any) => void = () => {};

  /** Identifier of the time to wait before closing (the result of calling setTimeout). */
  private timeoutId: number | undefined;

  constructor(public readonly id: number, public readonly duration: number | undefined | null) {
    this.result = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    if (!!this.duration && this.duration > 0) {
      console.log(`$setTimeout(() => { this.dismiss(); }`); // #
      this.timeoutId = window.setTimeout(() => this.dismiss(), Math.min(this.duration, MAX_TIMEOUT));
    }
  }

  public setHideWrapperFn(fn: () => void): void {
    this.hideWrapperFn = fn;
  }
  public setRemoveWrapperFn(fn: () => void): void {
    this.removeWrapperFn = fn;
  }
  /** Closes the snack bar by clicking on the "action" or "close" button. */
  public close(resultAction?: any): void {
    console.log(`$close(); resolve(${resultAction});`); // #
    this.clearTimeout();
    this.resolve(resultAction);
    this.hideWrapperFn();
  }
  /** Closes the snack bar when the timeout expires. */
  public dismiss(options?: { noAnimation?: boolean }): void {
    console.log(`$dismiss(); reject();`); // #
    this.clearTimeout();
    this.reject();
    if (!options?.noAnimation) {
      this.hideWrapperFn();
    } else {
      this.removeWrapperFn();
    }
  }

  // ** Private methods **

  private clearTimeout(): void {
    if (undefined !== this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
