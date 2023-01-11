import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnOptionComponent } from './gln-option.component';
import { GlnOptionsScrollDirective } from './gln-options-scroll.directive';

@NgModule({
  declarations: [GlnOptionComponent, GlnOptionsScrollDirective],
  imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule],
  exports: [GlnOptionComponent, GlnOptionsScrollDirective],
})
export class GlnOptionModule {}
