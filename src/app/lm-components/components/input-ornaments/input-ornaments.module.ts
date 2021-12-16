import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/lib-geranium/src/lib/grn-input/grn-input.module';
import { GrnFrameSizeModule } from 'projects/lib-geranium/src/lib/directives/grn-frame-size/grn-frame-size.module';

import { InputOrnamentsComponent } from './input-ornaments.component';

@NgModule({
  declarations: [InputOrnamentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GrnInputModule,
    GrnFrameSizeModule,
  ],
  exports: [InputOrnamentsComponent],
})
export class InputOrnamentsModule {}
