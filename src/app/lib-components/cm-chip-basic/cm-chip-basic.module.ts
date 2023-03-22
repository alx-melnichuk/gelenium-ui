import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnChipModule } from 'gelenium-ui';

import { CmChipBasicComponent } from './cm-chip-basic.component';

@NgModule({
  declarations: [CmChipBasicComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnChipModule],
  exports: [CmChipBasicComponent],
})
export class CmChipBasicModule {}
