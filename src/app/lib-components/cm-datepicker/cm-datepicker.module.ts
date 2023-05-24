import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmDatepickerBasicModule } from '../cm-datepicker-basic/cm-datepicker-basic.module';

import { CmDatepickerComponent } from './cm-datepicker.component';
import { CmDatepickerRoutingModule } from './cm-datepicker-routing.module';

@NgModule({
  declarations: [CmDatepickerComponent],
  imports: [CommonModule, CmDatepickerBasicModule, CmDatepickerRoutingModule],
  exports: [CmDatepickerComponent],
})
export class CmDatepickerModule {}
