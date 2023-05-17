import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnChipModule } from 'gelenium-ui';

import { CmChipAttributesComponent } from './cm-chip-attributes.component';

@NgModule({
  declarations: [CmChipAttributesComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnChipModule],
  exports: [CmChipAttributesComponent],
})
export class CmChipAttributesModule {}
