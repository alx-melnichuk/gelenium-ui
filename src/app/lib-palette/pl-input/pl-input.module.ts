import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlInputBasicModule } from '../pl-input-basic/pl-input-basic.module';
import { PlInputBootstrapModule } from '../pl-input-bootstrap/pl-input-bootstrap.module';
import { PlInputMaterialUiModule } from '../pl-input-material-ui/pl-input-material-ui.module';

import { PlInputComponent } from './pl-input.component';
import { PlInputRoutingModule } from './pl-input-routing.module';

@NgModule({
  declarations: [PlInputComponent],
  imports: [CommonModule, PlInputRoutingModule, PlInputBasicModule, PlInputBootstrapModule, PlInputMaterialUiModule],
  exports: [PlInputComponent],
})
export class PlInputModule {}
