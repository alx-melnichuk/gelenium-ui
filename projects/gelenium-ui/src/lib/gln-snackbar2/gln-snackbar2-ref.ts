import { PortalOutlet } from '@angular/cdk/portal';
import { EmbeddedViewRef, NgZone } from '@angular/core';
import { Observable, take } from 'rxjs';
// import { GlnSnackbar2Container } from './gln-snackbar2-container.component';

export interface GlnSnackbar2Ref<T> {
  instance: T | EmbeddedViewRef<any>;
  readonly result: Promise<any>;
  close(resultAction?: any): void;
  dismiss(options?: { noAnimation?: boolean }): void;
}

/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

export interface GlnSnackbarDismiss {
  dismissedByAction: boolean;
}

export class GlnSnackbar2Reference<T> {
  /** The instance of the component making up the content of the snack bar. */
  public instance!: T;

  /** A promise that is resolved when closed (by an action or close button) and rejected when closed by a timeout. */
  public readonly result: Promise<any>;

  private attachRefFn: (() => void) | null = null;
  private detachRefFn: (() => void) | null = null;
  private resolve: (result?: any) => void = () => {};
  private reject: (reason?: any) => void = () => {};

  /** Identifier of the time to wait before closing (the result of calling setTimeout). */
  private timeoutId: number | undefined;
  private isDisplayed: boolean = false;

  constructor(
    public readonly id: number,
    public readonly duration: number | undefined | null,
    public readonly wrapElement: HTMLElement,
    public wrapPortal: PortalOutlet,
    private ngZone: NgZone
  ) {
    this.result = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this.addAnimationEventListener();
  }

  public setAttachRefFn(fn: () => void) {
    this.attachRefFn = fn;
  }

  public setDetachRefFn(fn: () => void) {
    this.detachRefFn = fn;
  }

  public open(): void {
    if (!!this.attachRefFn) {
      this.attachRefFn();
    }
    this.wrapElement.setAttribute('animated', '');
    this.wrapElement.setAttribute('is-show', '');

    if (!!this.duration && this.duration > 0) {
      const duration: number = this.duration;
      this.ngZone.onStable
        .asObservable()
        .pipe(take(1))
        .subscribe(() => {
          console.log(`GlnSnackbar2Ref() ngZone.onStable.(setTimeout())`); // #
          this.timeoutId = window.setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
        });
    }
  }
  /** Closes the snack bar by clicking on the "action" or "close" button. */
  public close(resultAction?: any): void {
    console.log(`resolve(resultAction);`); // #
    this.resolve(resultAction);
    this.hideElement();
  }
  /** Closes the snack bar when the timeout expires. */
  public dismiss(options?: { noAnimation?: boolean }): void {
    console.log(`reject();`); // #
    this.reject();
    if (options?.noAnimation) {
      this.removeElement();
    } else {
      this.hideElement();
    }
  }

  private hideElement(): void {
    console.log(`hideElement();`); // #
    this.wrapElement.setAttribute('animated', '');
    this.wrapElement.setAttribute('is-hide', '');
  }

  private addAnimationEventListener(): void {
    this.wrapElement.addEventListener('animationend', this.animationEventListener);
    this.wrapElement.addEventListener('animationcancel', this.animationEventListener);
  }

  private removeAnimationEventListener(): void {
    this.wrapElement.removeEventListener('animationend', this.animationEventListener);
    this.wrapElement.removeEventListener('animationcancel', this.animationEventListener);
  }

  private animationEventListener = (ev: AnimationEvent) => {
    console.log(`animationEventListener();`); // #
    if (false === this.isDisplayed) {
      this.isDisplayed = true;
      this.wrapElement.removeAttribute('is-show');
      this.wrapElement.removeAttribute('animated');
    } else if (true === this.isDisplayed) {
      console.log(`animationEventListener(); this.isDisplayed:false;`); // #
      this.removeElement();
    }
  };

  private removeElement(): void {
    console.log(`removeElement();`); // #
    clearTimeout(this.timeoutId);

    this.removeAnimationEventListener();
    // this.snackbarContainer.removeElement(this.id);

    this.wrapPortal.detach();
    this.wrapPortal.dispose();

    if (!!this.detachRefFn) {
      this.detachRefFn();
    }
  }
}
