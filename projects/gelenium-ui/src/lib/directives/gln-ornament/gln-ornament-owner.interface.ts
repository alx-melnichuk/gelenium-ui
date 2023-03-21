import { ElementRef, InjectionToken } from '@angular/core';

/**
 * Describes the interface of an element that contains a list of ornament directives.
 */
export interface GlnOrnamentOwner {
  changeOrnament(isRemove: boolean, elementRef: ElementRef<HTMLElement>, isRight: boolean): void;
}

/**
 * An embedding token that is used to access the owner element.
 */
export const GLN_ORNAMENT_OWNER = new InjectionToken<GlnOrnamentOwner>('GLN_ORNAMENT_OWNER');
