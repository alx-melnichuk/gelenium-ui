import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnChipModule } from 'gelenium-ui';

import { CmChipConfigComponent } from './cm-chip-config.component';

@NgModule({
  declarations: [CmChipConfigComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnChipModule],
  exports: [CmChipConfigComponent],
})
export class CmChipConfigModule {}
