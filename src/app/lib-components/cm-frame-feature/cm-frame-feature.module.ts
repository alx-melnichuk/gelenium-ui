import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ngModel
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'gelenium-ui';

import { CmFrameFeatureComponent } from './cm-frame-feature.component';

@NgModule({
  declarations: [CmFrameFeatureComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [CmFrameFeatureComponent],
})
export class CmFrameFeatureModule {}
