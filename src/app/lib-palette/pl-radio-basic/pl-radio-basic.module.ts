import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnRadioButtonModule, GlnRadioGroupModule, GlnColorModule } from 'gelenium-ui';

import { PlRadioBasicComponent } from './pl-radio-basic.component';

@NgModule({
  declarations: [PlRadioBasicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
    GlnRadioButtonModule,
    GlnRadioGroupModule,
    GlnColorModule,
  ],
  exports: [PlRadioBasicComponent],
})
export class PlRadioBasicModule {}
