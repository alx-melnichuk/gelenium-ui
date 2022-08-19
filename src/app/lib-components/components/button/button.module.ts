import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonPaletteModule } from '../button-palette/button-palette.module';
import { ButtonPalette2Module } from '../button-palette2/button-palette2.module';
import { ButtonPalette3Module } from '../button-palette3/button-palette3.module';

import { ButtonComponent } from './button.component';
import { ButtonRoutingModule } from './button-routing.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, ButtonPaletteModule, ButtonPalette2Module, ButtonPalette3Module, ButtonRoutingModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
