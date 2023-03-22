import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmChipBasicModule } from '../cm-chip-basic/cm-chip-basic.module';

import { CmChipComponent } from './cm-chip.component';
import { CmChipRoutingModule } from './cm-chip-routing.module';

@NgModule({
  declarations: [CmChipComponent],
  imports: [CommonModule, CmChipBasicModule, CmChipRoutingModule],
  exports: [CmChipComponent],
})
export class CmChipModule {}
