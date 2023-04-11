import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlRadioBasicModule } from '../pl-radio-basic/pl-radio-basic.module';
import { PlRadioBootstrapModule } from '../pl-radio-bootstrap/pl-radio-bootstrap.module';
import { PlRadioMaterialUiModule } from '../pl-radio-material-ui/pl-radio-material-ui.module';

import { PlRadioComponent } from './pl-radio.component';
import { PlRadioRoutingModule } from './pl-radio-routing.module';

@NgModule({
  declarations: [PlRadioComponent],
  imports: [CommonModule, PlRadioBasicModule, PlRadioBootstrapModule, PlRadioMaterialUiModule, PlRadioRoutingModule],
  exports: [PlRadioComponent],
})
export class PlRadioModule {}
