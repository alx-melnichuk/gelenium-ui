import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTextareaModule } from 'gelenium-ui';

import { CmTextareaCapabilityComponent } from './cm-textarea-capability.component';

@NgModule({
  declarations: [CmTextareaCapabilityComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnTextareaModule],
  exports: [CmTextareaCapabilityComponent],
})
export class CmTextareaCapabilityModule {}
