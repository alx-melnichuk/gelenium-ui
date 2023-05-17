import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlCheckboxBasicModule } from '../pl-checkbox-basic/pl-checkbox-basic.module';
import { PlCheckboxBootstrapModule } from '../pl-checkbox-bootstrap/pl-checkbox-bootstrap.module';
import { PlCheckboxMaterialUiModule } from '../pl-checkbox-material-ui/pl-checkbox-material-ui.module';

import { PlCheckboxComponent } from './pl-checkbox.component';
import { PlCheckboxRoutingModule } from './pl-checkbox-routing.module';

@NgModule({
  declarations: [PlCheckboxComponent],
  imports: [CommonModule, PlCheckboxBasicModule, PlCheckboxBootstrapModule, PlCheckboxMaterialUiModule, PlCheckboxRoutingModule],
  exports: [PlCheckboxComponent],
})
export class PlCheckboxModule {}
