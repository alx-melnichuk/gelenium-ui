import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule } from 'gelenium-ui';

import { CmSpinnerApiComponent } from './cm-spinner-api.component';

@NgModule({
  declarations: [CmSpinnerApiComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule],
  exports: [CmSpinnerApiComponent],
})
export class CmSpinnerApiModule {}
