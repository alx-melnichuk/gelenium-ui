import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmDatepickerBasicModule } from '../cm-datepicker-basic/cm-datepicker-basic.module';
import { CmDatepickerFeatureModule } from '../cm-datepicker-feature/cm-datepicker-feature.module';

import { CmDatepickerComponent } from './cm-datepicker.component';
import { CmDatepickerRoutingModule } from './cm-datepicker-routing.module';

@NgModule({
  declarations: [CmDatepickerComponent],
  imports: [CommonModule, CmDatepickerBasicModule, CmDatepickerFeatureModule, CmDatepickerRoutingModule],
  exports: [CmDatepickerComponent],
})
export class CmDatepickerModule {}
