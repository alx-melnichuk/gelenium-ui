import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnMenuItemComponent } from './gln-menu-item.component';

@NgModule({
  declarations: [GlnMenuItemComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [GlnMenuItemComponent],
})
export class GlnMenuItemModule {}
