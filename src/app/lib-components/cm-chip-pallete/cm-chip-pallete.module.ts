import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnChipModule, GlnColorModule } from 'gelenium-ui';

import { CmChipPalleteComponent } from './cm-chip-pallete.component';

@NgModule({
  declarations: [CmChipPalleteComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnChipModule, GlnColorModule],
  exports: [CmChipPalleteComponent],
})
export class CmChipPalleteModule {}
