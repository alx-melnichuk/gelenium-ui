import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmCheckboxBasicModule } from '../cm-checkbox-basic/cm-checkbox-basic.module';

import { CmCheckboxComponent } from './cm-checkbox.component';
import { CmCheckboxRoutingModule } from './cm-checkbox-routing.module';

@NgModule({
  declarations: [CmCheckboxComponent],
  imports: [CommonModule, CmCheckboxBasicModule, CmCheckboxRoutingModule],
  exports: [CmCheckboxComponent],
})
export class CmCheckboxModule {}
