import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
// GlnColorModule for page "Pallete"
import { GlnChipModule, GlnColorModule } from 'gelenium-ui';

import { CmChipBasicComponent } from './cm-chip-basic.component';

@NgModule({
  declarations: [CmChipBasicComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnChipModule, GlnColorModule],
  exports: [CmChipBasicComponent],
})
export class CmChipBasicModule {}
