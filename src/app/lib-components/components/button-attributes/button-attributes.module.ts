import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnButtonModule } from 'projects/lib-geranium/src/lib/grn-button/grn-button.module';

import { ButtonAttributesComponent } from './button-attributes.component';

@NgModule({
  declarations: [ButtonAttributesComponent],
  imports: [CommonModule, GrnButtonModule],
  exports: [ButtonAttributesComponent],
})
export class ButtonAttributesModule {}
