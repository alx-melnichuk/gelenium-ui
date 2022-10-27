import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';

import { GlnAutocompleteComponent } from './gln-autocomplete.component';
import { GlnAutocompleteTriggerDirective } from './gln-autocomplete-trigger.directive';
import { GlnAutocompletePanelDirective } from './gln-autocomplete-panel.directive';

@NgModule({
  declarations: [GlnAutocompleteComponent, GlnAutocompleteTriggerDirective, GlnAutocompletePanelDirective],
  imports: [CommonModule, OverlayModule, GlnOptionModule, GlnOptionGroupModule],
  exports: [
    GlnAutocompleteComponent,
    GlnAutocompleteTriggerDirective,
    GlnAutocompletePanelDirective,
    GlnOptionModule,
    GlnOptionGroupModule,
  ],
  // providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class GlnAutocompleteModule {}
