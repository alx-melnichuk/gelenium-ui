import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'gelenium-ui';

import { CmFrameHelperTextComponent } from './cm-frame-helper-text.component';

@NgModule({
  declarations: [CmFrameHelperTextComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [CmFrameHelperTextComponent],
})
export class CmFrameHelperTextModule {}
