import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlTextareaBasicModule } from '../pl-textarea-basic/pl-textarea-basic.module';
import { PlTextareaBootstrapModule } from '../pl-textarea-bootstrap/pl-textarea-bootstrap.module';
import { PlTextareaMaterialUiModule } from '../pl-textarea-material-ui/pl-textarea-material-ui.module';

import { PlTextareaComponent } from './pl-textarea.component';
import { PlTextareaRoutingModule } from './pl-textarea-routing.module';

@NgModule({
  declarations: [PlTextareaComponent],
  imports: [CommonModule, PlTextareaRoutingModule, PlTextareaBasicModule, PlTextareaBootstrapModule, PlTextareaMaterialUiModule],
  exports: [PlTextareaComponent],
})
export class PlTextareaModule {}
