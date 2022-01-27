import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnButtonModule } from 'projects/lib-geranium/src/lib/grn-button/grn-button.module';

import { ButtonBasicComponent } from './button-basic.component';

@NgModule({
  declarations: [ButtonBasicComponent],
  imports: [CommonModule, GrnButtonModule],
  exports: [ButtonBasicComponent],
})
export class ButtonBasicModule {}
