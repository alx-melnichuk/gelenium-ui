import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';
import { GlnOptionListModule } from '../gln-option-list/gln-option-list.module';

import { GlnAutocomplete2Component } from './gln-autocomplete2.component';
import { GlnAutocomplete2TriggerDirective } from './gln-autocomplete2-trigger.directive';

@NgModule({
  declarations: [GlnAutocomplete2Component, GlnAutocomplete2TriggerDirective],
  imports: [CommonModule, GlnOptionModule, GlnOptionGroupModule, GlnOptionListModule],
  exports: [GlnAutocomplete2Component, GlnAutocomplete2TriggerDirective],
})
export class GlnAutocomplete2Module {}
