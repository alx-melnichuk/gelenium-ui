import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';
import { GlnOptionListModule } from '../gln-option-list/gln-option-list.module';

import { GlnAutocompleteComponent } from './gln-autocomplete.component';
import { GlnAutocompleteTriggerDirective } from './gln-autocomplete-trigger.directive';

@NgModule({
  declarations: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective],
  imports: [CommonModule, GlnOptionModule, GlnOptionGroupModule, GlnOptionListModule],
  exports: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective],
})
export class GlnAutocompleteModule {}