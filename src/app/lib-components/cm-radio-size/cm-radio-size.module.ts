import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnRadioButtonModule, GlnRadioGroupModule } from 'gelenium-ui';

import { CmRadioSizeComponent } from './cm-radio-size.component';

@NgModule({
  declarations: [CmRadioSizeComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnRadioButtonModule, GlnRadioGroupModule],
  exports: [CmRadioSizeComponent],
})
export class CmRadioSizeModule {}
