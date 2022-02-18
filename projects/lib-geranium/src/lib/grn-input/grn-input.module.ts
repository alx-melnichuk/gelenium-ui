import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GrnInputExteriorModule } from '../directives/grn-input-exterior/grn-input-exterior.module';
import { GrnOrnamentModule } from '../directives/grn-ornament/grn-ornament.module';
import { GrnSizeModule } from '../directives/grn-size/grn-size.module';
import { GrnFrameInputModule } from '../grn-frame-input/grn-frame-input.module';
import { GrnHintOrErrorModule } from '../grn-hint-or-error/grn-hint-or-error.module';

import { GrnInputComponent } from './grn-input.component';

@NgModule({
  declarations: [GrnInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GrnInputExteriorModule,
    GrnOrnamentModule,
    GrnSizeModule,
    GrnFrameInputModule,
    GrnHintOrErrorModule,
  ],
  exports: [GrnInputComponent],
})
export class GrnInputModule {}
