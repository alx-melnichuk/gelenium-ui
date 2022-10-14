import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnColorModule } from '../directives/gln-color/gln-color.module'; // Required for: color="primary"
import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnSwitchComponent } from './gln-switch.component';

@NgModule({
  declarations: [GlnSwitchComponent],
  imports: [CommonModule, ReactiveFormsModule, GlnColorModule, GlnTouchRippleModule],
  exports: [GlnSwitchComponent],
})
export class GlnSwitchModule {}
