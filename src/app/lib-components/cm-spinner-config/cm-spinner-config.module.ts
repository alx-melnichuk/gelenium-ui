import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule } from 'gelenium-ui';

import { CmSpinnerConfigComponent } from './cm-spinner-config.component';

@NgModule({
  declarations: [CmSpinnerConfigComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule],
  exports: [CmSpinnerConfigComponent],
})
export class CmSpinnerConfigModule {}
