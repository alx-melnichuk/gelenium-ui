import { PortalOutlet } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';

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
  instance!: T; // +

  /** A promise that is resolved when closed (by an action or close button) and rejected when closed by a timeout. */
  public result: Promise<any>;

  private detachRefFn: () => void = () => {};
  private resolve: (result?: any) => void = () => {};
  private reject: (reason?: any) => void = () => {};

  /** User notifications when the diner closes. */
  private readonly afterDismissedSub = new Subject<GlnSnackbarDismiss>();
  /** User notifications that the diner has opened and appeared. */
  private readonly afterOpenedSub = new Subject<void>();
  /** User notifications when an action is called in a snack bar. */
  private readonly onActionSub = new Subject<void>();

  /** Identifier of the time to wait before closing (the result of calling setTimeout). */
  private durationTimeoutId: number | undefined;
  /** An indication that the diner has been closed with an action button. */
  private dismissedByAction = false;

  constructor(
    public readonly id: number, // +
    public wrapPortal: PortalOutlet
  ) {
    this.result = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    // Dismiss snackbar on action.
    this.onAction().subscribe(() => this.dismiss());
    // containerInstance._onExit.subscribe(() => this.finishDismiss());
  }

  public setDetachFn(fn: () => void) {
    this.detachRefFn = fn;
  }

  public close(resultAction?: any): void {
    this.resolve(resultAction);
    console.log(`resolve(resultAction);`); // #
    this.removeElement();
  }

  public dismiss(): void {
    this.reject();
    console.log(`reject();`); // #
    this.removeElement();
  }

  private removeElement(): void {
    console.log(`removeElement();`); // #
    this.wrapPortal.detach();
    this.wrapPortal.dispose();
    this.detachRefFn();
  }
  // ** OLD **

  /** Dismisses the snack bar. */
  public dismiss0(): void {
    if (!this.afterDismissedSub.closed) {
      // this.containerInstance.exit();
    }
    clearTimeout(this.durationTimeoutId);
  }

  /** Marks the selected action in the diner. */
  public dismissWithAction(): void {
    if (!this.onActionSub.closed) {
      this.dismissedByAction = true;
      this.onActionSub.next();
      this.onActionSub.complete();
    }
    clearTimeout(this.durationTimeoutId);
  }

  /** Dismisses the snack bar after some duration */
  public dismissAfter(duration: number): void {
    this.durationTimeoutId = window.setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
  }

  /** Marks the snackbar as opened */
  public open(): void {
    if (!this.afterOpenedSub.closed) {
      this.afterOpenedSub.next();
      this.afterOpenedSub.complete();
    }
  }
  /** Cleans up the DOM after closing. */
  private finishDismiss(): void {
    // this._overlayRef.dispose();

    if (!this.onActionSub.closed) {
      this.onActionSub.complete();
    }

    this.afterDismissedSub.next({ dismissedByAction: this.dismissedByAction });
    this.afterDismissedSub.complete();
    this.dismissedByAction = false;
  }

  /** Gets an observable that is notified when the snack bar is finished closing. */
  public afterDismissed(): Observable<GlnSnackbarDismiss> {
    return this.afterDismissedSub;
  }

  /** Gets an observable that is notified when the snack bar has opened and appeared. */
  // public afterOpened(): Observable<void> {
  //   return this.containerInstance._onEnter;
  // }

  /** Gets an observable that is notified when the snack bar action is called. */
  public onAction(): Observable<void> {
    return this.onActionSub;
  }
}
