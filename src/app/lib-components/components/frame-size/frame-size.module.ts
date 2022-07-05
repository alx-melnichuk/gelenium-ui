import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GlnInputModule } from 'gelenium-ui';

import { FrameSizeComponent } from './frame-size.component';

@NgModule({
  declarations: [FrameSizeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    GlnInputModule,
  ],
  exports: [FrameSizeComponent],
})
export class FrameSizeModule {}
