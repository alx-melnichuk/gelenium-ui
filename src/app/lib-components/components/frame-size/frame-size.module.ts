import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GrnInputModule } from 'projects/lib-geranium/src/lib/grn-input/grn-input.module';

import { FrameSizeComponent } from './frame-size.component';

@NgModule({
  declarations: [FrameSizeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    GrnInputModule,
  ],
  exports: [FrameSizeComponent],
})
export class FrameSizeModule {}
