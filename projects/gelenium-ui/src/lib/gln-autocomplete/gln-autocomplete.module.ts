import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';
import { GlnOptionListModule } from '../gln-option-list/gln-option-list.module';

import { GlnAutocompleteComponent } from './gln-autocomplete.component';
import { GlnAutocompleteTriggerDirective } from './gln-autocomplete-trigger.directive';
import { GlnAutocompletePanelDirective } from './gln-autocomplete-panel.directive';

@NgModule({
  declarations: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective, GlnAutocompletePanelDirective],
  imports: [CommonModule, GlnOptionModule, GlnOptionGroupModule, GlnOptionListModule],
  exports: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective, GlnAutocompletePanelDirective],
})
export class GlnAutocompleteModule {}
