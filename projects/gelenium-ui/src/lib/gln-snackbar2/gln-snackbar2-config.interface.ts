import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, ViewContainerRef } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a snack bar. */
export const GLN_SNACKBAR2_DATA = new InjectionToken<any>('GLN_SNACKBAR2_DATA');

/** Possible values for horizontalPosition on MatSnackBarConfig. */
export type GlnSnackbarHorizontal = 'start' | 'center' | 'end' | 'left' | 'right';

/** Possible values for verticalPosition on MatSnackBarConfig. */
export type GlnSnackbarVertical = 'top' | 'bottom';

/**
 * Configuration used when opening a snack-bar.
 */
export class GlnSnackbar2Config<D = any> {
  /**
   * The view container that serves as the parent for the snackbar for the purposes of dependency
   * injection. Note: this does not affect where the snackbar is inserted in the DOM.
   */
  viewContainerRef?: ViewContainerRef;

  /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
  duration?: number = 0;

  /** Extra CSS classes to be added to the snack bar container. */
  panelClass?: string | string[];

  /** Text layout direction for the snack bar. */
  direction?: Direction;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** The horizontal position to place the snack bar. */
  horizontalPosition?: GlnSnackbarHorizontal = 'center';

  /** The vertical position to place the snack bar. */
  verticalPosition?: GlnSnackbarVertical = 'bottom';
}
