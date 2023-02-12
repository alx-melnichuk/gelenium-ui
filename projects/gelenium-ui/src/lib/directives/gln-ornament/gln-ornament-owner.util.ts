import { ElementRef } from '@angular/core';

/**
 * The class for the ornament list owner element.
 */
export class GlnOrnamentOwnerUtil {
  /** Get the width of all ornaments after the change. */
  public static getWidthAllOrnaments(list: ElementRef<HTMLElement>[], isRemove: boolean, elemRef: ElementRef<HTMLElement>): number | null {
    let isExist: boolean = false;
    let ornamentWidth: number = 0;
    for (let idx = 0; idx < list.length; idx++) {
      isExist = !isExist ? list[idx] === elemRef : isExist;
      ornamentWidth = ornamentWidth + list[idx].nativeElement.offsetWidth || 0;
    }
    if ((!isRemove && !isExist) || (isRemove && isExist)) {
      ornamentWidth = ornamentWidth + (isRemove ? -1 : 1) * elemRef.nativeElement.offsetWidth;
    }
    return 0 === ornamentWidth ? null : ornamentWidth;
  }
}
