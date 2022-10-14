import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTextareaModule } from 'gelenium-ui';

import { CmTextareaConfigComponent } from './cm-textarea-config.component';

@NgModule({
  declarations: [CmTextareaConfigComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnTextareaModule],

  exports: [CmTextareaConfigComponent],
})
export class CmTextareaConfigModule {}
