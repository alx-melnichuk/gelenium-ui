import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/lib-geranium/src/lib/grn-input/grn-input.module';

import { InputAttributesComponent } from './input-attributes.component';
import { GrnInput2Module } from 'projects/lib-geranium/src/lib/grn-input2/grn-input2.module';

@NgModule({
  declarations: [InputAttributesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GrnInputModule,
    GrnInput2Module,
  ],
  exports: [InputAttributesComponent],
})
export class InputAttributesModule {}
