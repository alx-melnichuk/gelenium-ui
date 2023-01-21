import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule, GlnColorModule } from 'gelenium-ui';

import { CmSpinnerPaletteComponent } from './cm-spinner-palette.component';

@NgModule({
  declarations: [CmSpinnerPaletteComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule, GlnColorModule],
  exports: [CmSpinnerPaletteComponent],
})
export class CmSpinnerPaletteModule {}
