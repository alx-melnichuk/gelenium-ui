import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'gelenium-ui';

import { CmFrameLabelComponent } from './cm-frame-label.component';

@NgModule({
  declarations: [CmFrameLabelComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [CmFrameLabelComponent],
})
export class CmFrameLabelModule {}
