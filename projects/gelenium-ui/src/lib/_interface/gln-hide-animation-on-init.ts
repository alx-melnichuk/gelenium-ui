import { ElementRef, Injectable, NgZone, Renderer2 } from '@angular/core';
import { first } from 'rxjs/operators';

import { HtmlElemUtil } from '../_utils/html-elem.util';

export const ATR_HAOI_HIDE_ANIMATION_INIT = 'hdAnmInit';

@Injectable()
export class GlnHideAnimationOnInit {
  constructor(protected renderer: Renderer2, protected elementRef: ElementRef<HTMLElement>, protected ngZone: NgZone) {}

  public ngOnInit(): void {
    // Add an attribute that disables animation on initialization.
    this.settingAttrByIsFlag(this.renderer, this.elementRef, true);
  }

  public setElementRef(elementRef: ElementRef<HTMLElement>): void {
    this.elementRef = elementRef;
  }

  public ngAfterViewInitWithNgZone(): void {
    // The ngZone will become stable when there are no more render tasks.
    // This means that our component has already been rendered.
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.settingAttrByIsFlag(this.renderer, this.elementRef, false);
    });
  }

  public ngAfterViewInitWithPromise(): void {
    Promise.resolve().then(() => {
      this.settingAttrByIsFlag(this.renderer, this.elementRef, false);
    });
  }

  /** Add or Remove an attribute that disables animation on initialization. */
  public settingAttrByIsFlag(renderer: Renderer2, elementRef: ElementRef<HTMLElement>, isFlag: boolean): void {
    HtmlElemUtil.setAttr(renderer, elementRef, ATR_HAOI_HIDE_ANIMATION_INIT, isFlag ? '' : null);
  }
}
