import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionModule, GlnSelectModule } from 'gelenium-ui';

import { CmSelectValidationComponent } from './cm-select-validation.component';

@NgModule({
  declarations: [CmSelectValidationComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnOptionModule, GlnSelectModule],
  exports: [CmSelectValidationComponent],
})
export class CmSelectValidationModule {}
