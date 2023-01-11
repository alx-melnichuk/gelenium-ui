import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';

import { GlnAutocompleteComponent } from './gln-autocomplete.component';
import { GlnAutocompleteTriggerDirective } from './gln-autocomplete-trigger.directive';
import { GlnAutocompletePanelDirective } from './gln-autocomplete-panel.directive';
import { GlnHighlightPipe } from './gln-highlight.pipe';

@NgModule({
  declarations: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective, GlnAutocompletePanelDirective, GlnHighlightPipe],
  imports: [CommonModule, GlnOptionModule, GlnOptionGroupModule],
  exports: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective, GlnAutocompletePanelDirective, GlnHighlightPipe],
})
export class GlnAutocompleteModule {}
