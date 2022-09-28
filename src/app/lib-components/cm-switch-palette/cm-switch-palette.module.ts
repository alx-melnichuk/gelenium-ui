import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnSwitchModule } from 'gelenium-ui';

import { CmSwitchPaletteComponent } from './cm-switch-palette.component';

@NgModule({
  declarations: [CmSwitchPaletteComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnColorModule, GlnSwitchModule],
  exports: [CmSwitchPaletteComponent],
})
export class CmSwitchPaletteModule {}
