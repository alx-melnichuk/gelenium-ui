import { Directive, ElementRef, Host, Inject, Input, OnDestroy, OnInit, Optional, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

import { GlnOptionListTriggerDirective } from '../gln-option-list/gln-option-list-trigger.directive';
import { GlnOptionListTrigger } from '../gln-option-list/gln-option-list-trigger.interface';
import { GlnOptionList } from '../gln-option-list/gln-option-list.interface';

@Directive({
  selector: '[glnAutocompleteTrigger]',
  exportAs: 'glnAutocompleteTrigger',
})
export class GlnAutocompleteTriggerDirective extends GlnOptionListTriggerDirective implements OnInit, OnDestroy, GlnOptionListTrigger {
  @Input('glnAutocompleteTrigger')
  public override optionList: GlnOptionList | null | undefined;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) platformId: Object,
    renderer: Renderer2,
    hostRef: ElementRef<HTMLElement>,
    @Optional() @Host() control: NgControl | null
  ) {
    super(platformId, renderer, hostRef, control);
  }
}
