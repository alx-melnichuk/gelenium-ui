import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnRadioButtonModule, GlnRadioGroupModule } from 'gelenium-ui';

import { CmRadioConfigComponent } from './cm-radio-config.component';

@NgModule({
  declarations: [CmRadioConfigComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnRadioButtonModule, GlnRadioGroupModule],
  exports: [CmRadioConfigComponent],
})
export class CmRadioConfigModule {}
