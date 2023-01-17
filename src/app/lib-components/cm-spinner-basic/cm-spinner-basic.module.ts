import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule, GlnColorModule } from 'gelenium-ui';

import { CmSpinnerBasicComponent } from './cm-spinner-basic.component';

@NgModule({
  declarations: [CmSpinnerBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule, GlnColorModule],
  exports: [CmSpinnerBasicComponent],
})
export class CmSpinnerBasicModule {}
