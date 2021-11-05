import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LibDirectivesModule } from '../directives/lib-directives.module';
import { GrnFrameInputModule } from '../grn-frame-input/grn-frame-input.module';

import { GrnInputComponent } from './grn-input.component';
import { GrnOrnamentDirective } from './grn-ornament.directive';
import { GrnOrnamentEndDirective } from './grn-ornament-end.directive';

@NgModule({
  declarations: [GrnInputComponent, GrnOrnamentDirective, GrnOrnamentEndDirective],
  imports: [CommonModule, ReactiveFormsModule, LibDirectivesModule, GrnFrameInputModule],
  exports: [GrnInputComponent, GrnOrnamentDirective, GrnOrnamentEndDirective],
})
export class GrnInputModule {}
