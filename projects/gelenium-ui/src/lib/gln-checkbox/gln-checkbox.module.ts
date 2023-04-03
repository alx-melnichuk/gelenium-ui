import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnCheckboxComponent } from './gln-checkbox.component';

@NgModule({
  declarations: [GlnCheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule],
  exports: [GlnCheckboxComponent],
})
export class GlnCheckboxModule {}
