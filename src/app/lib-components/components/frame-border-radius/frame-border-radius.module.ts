import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'projects/gelenium-ui/src/lib/gln-input/gln-input.module';

import { FrameBorderRadiusComponent } from './frame-border-radius.component';

@NgModule({
  declarations: [FrameBorderRadiusComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [FrameBorderRadiusComponent],
})
export class FrameBorderRadiusModule {}
