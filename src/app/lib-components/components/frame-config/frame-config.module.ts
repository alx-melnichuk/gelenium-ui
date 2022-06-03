import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'projects/gelenium-ui/src/lib/gln-input/gln-input.module';

import { FrameConfigComponent } from './frame-config.component';

@NgModule({
  declarations: [FrameConfigComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [FrameConfigComponent],
})
export class FrameConfigModule {}
