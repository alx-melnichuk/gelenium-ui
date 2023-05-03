import { InjectionToken, ViewContainerRef } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a snackbar. */
export const GLN_SNACKBAR_DATA = new InjectionToken<any>('GLN_SNACKBAR_DATA');

/**
 * Configuration used when opening a snack-bar.
 */
export class GlnSnackbarConfig<D = any> {
  public static defaultDuration: number = 6000;
  public static defaultHorizontal: string = 'center';
  public static defaultMaxCount: number = 6;
  public static defaultVertical: string = 'bottom';
  public static defaultTransition: string = 'grow';

  /** The data is passed to the child component (via the injector). */
  public data?: D | null | undefined = undefined;
  /** Time to wait (in milliseconds) before automatically closing the snackbar. */
  public duration?: number | undefined = GlnSnackbarConfig.defaultDuration;
  /** Horizontal position to accommodate the snackbar. ('center' - default, 'left', 'right') */
  public horizontal?: string | undefined = GlnSnackbarConfig.defaultHorizontal;
  /** The maximum number of visible snackbar items in the current overlay. */
  public maxCount?: number | undefined = GlnSnackbarConfig.defaultMaxCount;
  /** Additional CSS classes to add to the snackbar overlay panel. */
  public panelClass?: string | string[] | undefined;
  /** Vertical position to accommodate the snackbar. ('bottom' - default, 'top', 'center') */
  public vertical?: string | undefined = GlnSnackbarConfig.defaultVertical;
  /** The dependency injection view container that serves as the parent of the snackbar. */
  public viewContainerRef?: ViewContainerRef | undefined;
  /** Type of transformation when displaying (hiding) the snackbar.
   * ('grow' - default, 'fade', 'blur', 'slide', 'slide-dw', 'slide-lf', 'slide-rg', 'turn', 'turn-y')
   */
  public transition?: string | undefined = GlnSnackbarConfig.defaultTransition;
  /** Additional CSS classes to add on the wrapper to the snackbar. */
  public wrapperClass?: string | string[] | undefined;
}
