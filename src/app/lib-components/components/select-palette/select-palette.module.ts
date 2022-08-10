import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnOptionModule, GlnSelectModule } from 'gelenium-ui';

import { SelectPaletteComponent } from './select-palette.component';

@NgModule({
  declarations: [SelectPaletteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnColorModule,
    GlnOptionModule,
    GlnSelectModule,
  ],
  exports: [SelectPaletteComponent],
})
export class SelectPaletteModule {}
