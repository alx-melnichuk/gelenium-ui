import { InjectionToken, ViewContainerRef } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a snack bar. */
export const GLN_SNACKBAR_DATA = new InjectionToken<any>('GLN_SNACKBAR_DATA');

/**
 * Configuration used when opening a snack-bar.
 */
export class GlnSnackbarConfig<D = any> {
  public static defaultHorizontal: string = 'center';
  public static defaultVertical: string = 'bottom';
  public static defaultTransition: string = 'grow';

  /** The data is passed to the child component (via the injector). */
  public data?: D | null = null;
  /** Time to wait (in milliseconds) before automatically closing the snack bar. */
  public duration?: number | undefined = 6000;
  /** Horizontal position to accommodate the snack bar. */
  public horizontal?: string | undefined = GlnSnackbarConfig.defaultHorizontal; // 'left','center','right'
  /** The maximum number of visible snack bar items in the current overlay.
   * Affects when the overlay is created (when the first element of the snack bar appears).
   */
  public maxCountItems?: number | undefined = 0;
  /** Additional CSS classes to add to the snack bar overlay panel. */
  public panelClass?: string | string[] | undefined;
  /** Vertical position to accommodate the snack bar. */
  public vertical?: string | undefined = GlnSnackbarConfig.defaultVertical; // 'top','center','bottom'
  /** The dependency injection view container that serves as the parent of the snack bar. */
  public viewContainerRef?: ViewContainerRef | undefined;
  /** Type of transformation when displaying (hiding) the snack bar. */
  // 'grow','fade','blur','slide','slide-dw','slide-lf','slide-rg','turn','turn-y';
  public transition?: string | undefined = GlnSnackbarConfig.defaultTransition;
  /** Additional CSS classes to add on the wrapper to the snack bar. */
  public wrapperClass?: string | string[] | undefined;
}
