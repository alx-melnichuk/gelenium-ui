import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/lib-geranium/src/lib/grn-input/grn-input.module';

import { FrameInputLabelComponent } from './frame-input-label.component';

@NgModule({
  declarations: [FrameInputLabelComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GrnInputModule],
  exports: [FrameInputLabelComponent],
})
export class FrameInputLabelModule {}
