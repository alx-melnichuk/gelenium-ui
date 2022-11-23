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
  selector: 'gln-autocomplete',
  exportAs: 'glnAutocomplete',
  templateUrl: '../gln-option-list/gln-option-list.component.html',
  styleUrls: ['../gln-option-list/gln-option-list.component.scss', './gln-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: GLN_OPTION_PARENT, useExisting: GlnAutocompleteComponent }],
})
export class GlnAutocompleteComponent extends GlnOptionListComponent implements OnChanges, OnInit, GlnOptionList, GlnOptionParent {
  constructor(renderer: Renderer2, hostRef: ElementRef<HTMLElement>, changeDetectorRef: ChangeDetectorRef) {
    super(renderer, hostRef, changeDetectorRef);
  }
}
