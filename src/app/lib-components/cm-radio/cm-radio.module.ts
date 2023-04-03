import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmRadioBasicModule } from '../cm-radio-basic/cm-radio-basic.module';

import { CmRadioComponent } from './cm-radio.component';
import { CmRadioRoutingModule } from './cm-radio-routing.module';

@NgModule({
  declarations: [CmRadioComponent],
  imports: [CommonModule, CmRadioBasicModule, CmRadioRoutingModule],
  exports: [CmRadioComponent],
})
export class CmRadioModule {}
