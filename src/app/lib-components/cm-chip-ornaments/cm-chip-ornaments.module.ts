import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnChipModule } from 'gelenium-ui';

import { CmChipOrnamentsComponent } from './cm-chip-ornaments.component';

@NgModule({
  declarations: [CmChipOrnamentsComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnChipModule],
  exports: [CmChipOrnamentsComponent],
})
export class CmChipOrnamentsModule {}
