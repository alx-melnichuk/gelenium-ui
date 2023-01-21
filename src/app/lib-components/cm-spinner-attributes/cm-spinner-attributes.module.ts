import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule } from 'gelenium-ui';

import { CmSpinnerAttributesComponent } from './cm-spinner-attributes.component';

@NgModule({
  declarations: [CmSpinnerAttributesComponent],
  imports: [CommonModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule],
  exports: [CmSpinnerAttributesComponent],
})
export class CmSpinnerAttributesModule {}
