import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  OnInit,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

import { GlnOptionParent, GLN_OPTION_PARENT } from '../gln-option/gln-option-parent.interface';
import { GlnOptionListComponent } from '../gln-option-list/gln-option-list.component';
import { GlnOptionList } from '../gln-option-list/gln-option-list.interface';

@Component({
  selector: 'gln-autocomplete2',
  exportAs: 'glnAutocomplete2',
  templateUrl: '../gln-option-list/gln-option-list.component.html',
  styleUrls: ['../gln-option-list/gln-option-list.component.scss', './gln-autocomplete2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_OPTION_PARENT, useExisting: GlnAutocomplete2Component }],
})
export class GlnAutocomplete2Component extends GlnOptionListComponent implements OnChanges, OnInit, GlnOptionList, GlnOptionParent {
  constructor(renderer: Renderer2, hostRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef) {
    super(renderer, hostRef, changeDetectorRef);
  }
}
