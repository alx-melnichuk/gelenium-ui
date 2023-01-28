import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';
import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';

import { GlnSelectComponent } from './gln-select.component';
import { GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION } from './gln-select.providers';
import { GlnSelectTriggerDirective } from './gln-select-trigger.directive';

@NgModule({
  declarations: [GlnSelectComponent, GlnSelectTriggerDirective],
  imports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule,
    GlnFrameModule,
    GlnFrameOrnamentModule,
    GlnHintOrErrorModule,
    GlnOptionModule,
    GlnOptionGroupModule,
  ],
  exports: [GlnSelectComponent, GlnSelectTriggerDirective],
  providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION],
})
export class GlnSelectModule {}
