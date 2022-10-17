import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';

import { GlnAutocompleteComponent } from './gln-autocomplete.component';
import { GlnAutocompleteTriggerDirective } from './gln-autocomplete-trigger.directive';

@NgModule({
  declarations: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective],
  imports: [CommonModule, OverlayModule, GlnOptionModule, GlnOptionGroupModule],
  exports: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective, GlnOptionModule, GlnOptionGroupModule],
  // providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class GlnAutocompleteModule {}
