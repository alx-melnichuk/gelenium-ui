import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnRadioButtonComponent } from './gln-radio-button.component';

@NgModule({
  declarations: [GlnRadioButtonComponent],
  imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule],
  exports: [GlnRadioButtonComponent],
})
export class GlnRadioButtonModule {}
