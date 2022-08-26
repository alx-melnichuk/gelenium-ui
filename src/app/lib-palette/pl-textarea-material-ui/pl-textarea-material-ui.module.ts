import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTextareaModule } from 'gelenium-ui';

import { PlTextareaMaterialUiComponent } from './pl-textarea-material-ui.component';

@NgModule({
  declarations: [PlTextareaMaterialUiComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnTextareaModule],
  exports: [PlTextareaMaterialUiComponent],
})
export class PlTextareaMaterialUiModule {}
