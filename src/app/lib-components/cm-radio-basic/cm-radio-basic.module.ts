import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnRadioButtonModule, GlnRadioGroupModule } from 'gelenium-ui'; // GlnColorModule only for page: Palette.

import { CmRadioBasicComponent } from './cm-radio-basic.component';

@NgModule({
  declarations: [CmRadioBasicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
    GlnRadioButtonModule,
    GlnRadioGroupModule,
    GlnColorModule,
  ],
  exports: [CmRadioBasicComponent],
})
export class CmRadioBasicModule {}
