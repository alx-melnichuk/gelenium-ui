import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSpinnerModule } from 'gelenium-ui';

import { CmSpinnerBasicComponent } from './cm-spinner-basic.component';

@NgModule({
  declarations: [CmSpinnerBasicComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnSpinnerModule],
  exports: [CmSpinnerBasicComponent],
})
export class CmSpinnerBasicModule {}
