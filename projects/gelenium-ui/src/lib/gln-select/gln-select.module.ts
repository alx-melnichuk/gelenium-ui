import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnColorModule } from '../directives/gln-color/gln-color.module'; // Required for: color="primary"
import { GlnFrameExteriorInputModule } from '../directives/gln-frame-exterior-input/gln-frame-exterior-input.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';
import { GlnOptionModule } from '../gln-option/gln-option.module';

import { GlnSelectComponent } from './gln-select.component';
import { GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION } from './gln-select.providers';
import { GlnSelectTriggerDirective } from './gln-select-trigger.directive';

@NgModule({
  declarations: [GlnSelectComponent, GlnSelectTriggerDirective],
  imports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule,
    GlnColorModule,
    GlnFrameExteriorInputModule,
    GlnFrameModule,
    GlnFrameOrnamentModule,
    GlnFrameSizeModule,
    GlnHintOrErrorModule,
    GlnOptionModule,
  ],
  exports: [GlnSelectComponent, GlnSelectTriggerDirective],
  providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER_REPOSITION],
})
export class GlnSelectModule {}
