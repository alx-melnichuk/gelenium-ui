import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'gelenium-ui';

import { CmInputBasicComponent } from './cm-input-basic.component';

@NgModule({
  declarations: [CmInputBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [CmInputBasicComponent],
})
export class CmInputBasicModule {}
