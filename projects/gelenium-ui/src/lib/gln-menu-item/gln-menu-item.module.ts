import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnTouchRippleModule } from '../gln-touch-ripple/gln-touch-ripple.module';

import { GlnMenuItemComponent } from './gln-menu-item.component';

@NgModule({
  declarations: [GlnMenuItemComponent],
  imports: [CommonModule, ReactiveFormsModule, GlnTouchRippleModule],
  exports: [GlnMenuItemComponent],
})
export class GlnMenuItemModule {}
