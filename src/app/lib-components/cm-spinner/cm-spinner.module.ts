import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmSpinnerBasicModule } from '../cm-spinner-basic/cm-spinner-basic.module';

import { CmSpinnerComponent } from './cm-spinner.component';
import { CmSpinnerRoutingModule } from './cm-spinner-routing.module';

@NgModule({
  declarations: [CmSpinnerComponent],
  imports: [CommonModule, CmSpinnerBasicModule, CmSpinnerRoutingModule],
  exports: [CmSpinnerComponent],
})
export class CmSpinnerModule {}
