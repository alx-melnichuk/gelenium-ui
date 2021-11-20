import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnTextareaModule } from 'projects/lib-geranium/src/lib/grn-textarea/grn-textarea.module';

import { TextareaBasicComponent } from './textarea-basic.component';

@NgModule({
  declarations: [TextareaBasicComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GrnTextareaModule],
  exports: [TextareaBasicComponent],
})
export class TextareaBasicModule {}
