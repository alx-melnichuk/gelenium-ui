import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTextareaModule } from 'gelenium-ui';

import { CmTextareaBasicComponent } from './cm-textarea-basic.component';

@NgModule({
  declarations: [CmTextareaBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnTextareaModule],
  exports: [CmTextareaBasicComponent],
})
export class CmTextareaBasicModule {}
