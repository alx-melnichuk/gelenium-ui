import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnInputModule } from 'gelenium-ui';

import { InputPaletteComponent } from './input-palette.component';

@NgModule({
  declarations: [InputPaletteComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnColorModule, GlnInputModule],
  exports: [InputPaletteComponent],
})
export class InputPaletteModule {}
