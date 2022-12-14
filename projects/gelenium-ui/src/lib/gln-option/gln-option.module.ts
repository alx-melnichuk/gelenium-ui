import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnOptionComponent } from './gln-option.component';
import { GlnOptionsPanelDirective } from './gln-options-panel.directive';
import { GlnOptionsScrollDirective } from './gln-options-scroll.directive';

@NgModule({
  declarations: [GlnOptionComponent, GlnOptionsPanelDirective, GlnOptionsScrollDirective],
  imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule],
  exports: [GlnOptionComponent, GlnOptionsPanelDirective, GlnOptionsScrollDirective],
})
export class GlnOptionModule {}
