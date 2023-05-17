import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnRadioButtonModule, GlnRadioGroupModule } from 'gelenium-ui';

import { CmRadioAttributesComponent } from './cm-radio-attributes.component';

@NgModule({
  declarations: [CmRadioAttributesComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnRadioButtonModule, GlnRadioGroupModule],
  exports: [CmRadioAttributesComponent],
})
export class CmRadioAttributesModule {}
