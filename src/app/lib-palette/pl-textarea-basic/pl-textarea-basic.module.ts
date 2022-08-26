import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnTextareaModule } from 'gelenium-ui';

import { PlTextareaBasicComponent } from './pl-textarea-basic.component';

@NgModule({
  declarations: [PlTextareaBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnColorModule, GlnTextareaModule],
  exports: [PlTextareaBasicComponent],
})
export class PlTextareaBasicModule {}
