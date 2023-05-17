import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnRadioButtonModule, GlnRadioGroupModule } from 'gelenium-ui';

import { PlRadioMaterialUiComponent } from './pl-radio-material-ui.component';

@NgModule({
  declarations: [PlRadioMaterialUiComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnRadioButtonModule, GlnRadioGroupModule],
  exports: [PlRadioMaterialUiComponent],
})
export class PlRadioMaterialUiModule {}
