import { InjectionToken, ViewContainerRef } from '@angular/core';

// export type GlnSnackbarDataType = { message?: string; action?: string }; // ??

/** Injection token that can be used to access the data that was passed in to a snack bar. */
export const GLN_SNACKBAR2_DATA = new InjectionToken<any>('GLN_SNACKBAR2_DATA');

export type GlnSnackbarTransition = 'grow' | 'fade' | 'slide';
export type GlnSnackbarSlideDirection = 'left' | 'right' | 'up' | 'down';

/** Possible values for horizontalPosition. */
// #export type GlnSnackbarHorizontal = 'start' | 'center' | 'end' | 'left' | 'right';
export type GlnSnackbarHorizontal = 'left' | 'center' | 'right';

/** Possible values for vertical position. */
export type GlnSnackbarVertical = 'top' | 'center' | 'bottom';

/**
 * Configuration used when opening a snack-bar.
 */
export class GlnSnackbar2Config<D = any> {
  // public static defaultHorizontal: GlnSnackbarHorizontal = 'center';
  // public static defaultVertical: GlnSnackbarVertical = 'bottom';
  // public static defaultTransition: GlnSnackbarTransition = 'slide'; // 'grow';
  // public static defaultSlideDirection: GlnSnackbarSlideDirection = 'up'; // up down right left;
  /** The data is passed to the child component (via the injector). */
  public data?: D | null = null;
  /** Time to wait (in milliseconds) before automatically closing the snack bar. */
  public duration?: number | undefined = 0;
  /** Horizontal position to accommodate the snack bar. */
  public horizontal?: GlnSnackbarHorizontal | undefined = 'center';
  /** Additional CSS classes to add to the snack bar. */
  public panelClass?: string | string[] | undefined;
  /** Vertical position to accommodate the snack bar. */
  public vertical?: GlnSnackbarVertical | undefined = 'bottom';
  /** The dependency injection view container that serves as the parent of the snack bar. */
  public viewContainerRef?: ViewContainerRef | undefined;
  /** The direction of movement of the snack bar during the transformation of the 'slide'. */
  public slideDirection?: GlnSnackbarSlideDirection | undefined = 'up'; // up down right left;
  /** Type of transformation when displaying (hiding) the snack bar. */
  public transition?: GlnSnackbarTransition | undefined = 'grow'; // grow fade slide;
}
