import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';

import { GlnAutocomplete1Component } from './gln-autocomplete1.component';
import { GlnAutocomplete1TriggerDirective } from './gln-autocomplete1-trigger.directive';
import { GlnAutocomplete1PanelDirective } from './gln-autocomplete1-panel.directive';

@NgModule({
  declarations: [GlnAutocomplete1Component, GlnAutocomplete1TriggerDirective, GlnAutocomplete1PanelDirective],
  imports: [CommonModule, OverlayModule, GlnOptionModule, GlnOptionGroupModule],
  exports: [
    GlnAutocomplete1Component,
    GlnAutocomplete1TriggerDirective,
    GlnAutocomplete1PanelDirective,
    GlnOptionModule,
    GlnOptionGroupModule,
  ],
  // providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class GlnAutocomplete1Module {}
