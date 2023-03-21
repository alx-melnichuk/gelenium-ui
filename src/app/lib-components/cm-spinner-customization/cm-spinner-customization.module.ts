import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule } from 'gelenium-ui';

import { CmSpinnerCustomizationComponent } from './cm-spinner-customization.component';

@NgModule({
  declarations: [CmSpinnerCustomizationComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule],
  exports: [CmSpinnerCustomizationComponent],
})
export class CmSpinnerCustomizationModule {}
