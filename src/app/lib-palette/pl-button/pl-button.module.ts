import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlButtonBasicModule } from '../pl-button-basic/pl-button-basic.module';
import { PlButtonBootstrapModule } from '../pl-button-bootstrap/pl-button-bootstrap.module';
import { PlButtonMaterialUiModule } from '../pl-button-material-ui/pl-button-material-ui.module';

import { PlButtonComponent } from './pl-button.component';
import { PlButtonRoutingModule } from './pl-button-routing.module';

@NgModule({
  declarations: [PlButtonComponent],
  imports: [CommonModule, PlButtonRoutingModule, PlButtonBasicModule, PlButtonBootstrapModule, PlButtonMaterialUiModule],
  exports: [PlButtonComponent],
})
export class PlButtonModule {}
