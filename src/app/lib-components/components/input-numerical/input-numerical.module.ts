import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule, GlnRegexModule } from 'gelenium-ui';

import { InputNumericalComponent } from './input-numerical.component';

@NgModule({
  declarations: [InputNumericalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnInputModule,
    GlnRegexModule,
  ],
  exports: [InputNumericalComponent],
})
export class InputNumericalModule {}
