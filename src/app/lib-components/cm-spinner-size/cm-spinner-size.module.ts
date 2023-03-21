import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule } from 'gelenium-ui';

import { CmSpinnerSizeComponent } from './cm-spinner-size.component';

@NgModule({
  declarations: [CmSpinnerSizeComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule],
  exports: [CmSpinnerSizeComponent],
})
export class CmSpinnerSizeModule {}
