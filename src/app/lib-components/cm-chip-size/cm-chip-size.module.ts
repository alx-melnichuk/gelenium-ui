import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnChipModule } from 'gelenium-ui';

import { CmChipSizeComponent } from './cm-chip-size.component';

@NgModule({
  declarations: [CmChipSizeComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnChipModule],
  exports: [CmChipSizeComponent],
})
export class CmChipSizeModule {}
