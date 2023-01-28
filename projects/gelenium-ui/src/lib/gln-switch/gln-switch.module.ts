import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnSwitchComponent } from './gln-switch.component';

@NgModule({
  declarations: [GlnSwitchComponent],
  imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule],
  exports: [GlnSwitchComponent],
})
export class GlnSwitchModule {}
