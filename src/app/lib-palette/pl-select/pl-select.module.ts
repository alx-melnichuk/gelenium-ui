import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlSelectBasicModule } from '../pl-select-basic/pl-select-basic.module';
import { PlSelectBootstrapModule } from '../pl-select-bootstrap/pl-select-bootstrap.module';
import { PlSelectMaterialUiModule } from '../pl-select-material-ui/pl-select-material-ui.module';

import { PlSelectComponent } from './pl-select.component';
import { PlSelectRoutingModule } from './pl-select-routing.module';

@NgModule({
  declarations: [PlSelectComponent],
  imports: [CommonModule, PlSelectRoutingModule, PlSelectBasicModule, PlSelectBootstrapModule, PlSelectMaterialUiModule],
  exports: [PlSelectComponent],
})
export class PlSelectModule {}
