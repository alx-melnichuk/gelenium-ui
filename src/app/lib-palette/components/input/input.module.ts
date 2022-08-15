import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputPaletteModule } from '../input-palette/input-palette.module';

import { InputComponent } from './input.component';
import { InputRoutingModule } from './input-routing.module';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, InputPaletteModule, InputRoutingModule],
  exports: [InputComponent],
})
export class InputModule {}
