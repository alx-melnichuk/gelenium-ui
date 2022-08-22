import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule, GlnRegexModule } from 'gelenium-ui';

import { CmInputNumericalComponent } from './cm-input-numerical.component';

@NgModule({
  declarations: [CmInputNumericalComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule, GlnRegexModule],
  exports: [CmInputNumericalComponent],
})
export class CmInputNumericalModule {}
