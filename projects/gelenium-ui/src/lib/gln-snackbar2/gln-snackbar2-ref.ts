import { PortalOutlet } from '@angular/cdk/portal';
import { NgZone } from '@angular/core';
import { Observable, take } from 'rxjs';
// import { GlnSnackbar2Container } from './gln-snackbar2-container.component';

export interface GlnSnackbar2Inst<T> {
  /** Your Toast ID. Use this to close it individually */
  id: number;
  // /** the title of your toast. Stored to prevent duplicates */
  // title: string;
  /** the message of your toast. Stored to prevent duplicates */
  message: string;
  action: string;
  // /** a reference to the component see portal.ts */
  // portal: ComponentRef<T>;
  // /** a reference to your toast */
  // toastRef: ToastRef<T>;
  // /** triggered when toast is active */
  // onShown: Observable<void>;
  // /** triggered when toast is destroyed */
  // onHidden: Observable<void>;
  // /** triggered on toast click */
  // onTap: Observable<void>;
  /** available for your use in custom toast */
  onAction: Observable<void>;
}

/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

export interface GlnSnackbarDismiss {
  dismissedByAction: boolean;
}

export class GlnSnackbar2Ref<T> {
  /** The instance of the component making up the content of the snack bar. */
  public instance!: T; // +

  /** A promise that is resolved when closed (by an action or close button) and rejected when closed by a timeout. */
  public readonly result: Promise<any>;

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
    private wrapPortal: PortalOutlet,
    // private snackbarContainer: GlnSnackbar2Container,
    private ngZone: NgZone
  ) {
    this.result = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    if (!!duration && duration > 0) {
      this.ngZone.onStable
        .asObservable()
        .pipe(take(1))
        .subscribe(() => {
          console.log(`GlnSnackbar2Ref() ngZone.onStable.(setTimeout())`); // #
          this.timeoutId = window.setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
        });
    }

    this.addAnimationEventListener();
  }

  public setDetachRefFn(fn: () => void) {
    this.detachRefFn = fn;
  }

  /** Closes the snack bar by clicking on the "action" or "close" button. */
  public close(resultAction?: any): void {
    console.log(`resolve(resultAction);`); // #
    this.resolve(resultAction);
    this.hideElement();
  }
  /** Closes the snack bar when the timeout expires. */
  public dismiss(): void {
    console.log(`reject();`); // #
    this.reject();
    this.hideElement();
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
      this.detachRefFn = null;
    }
  }
}
