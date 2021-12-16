import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/lib-geranium/src/lib/grn-input/grn-input.module';
import { GrnRegexModule } from 'projects/lib-geranium/src/lib/directives/grn-regex/grn-regex.module';

import { RegexCheckBasicComponent } from './regex-check-basic.component';

@NgModule({
  declarations: [RegexCheckBasicComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GrnInputModule,
    GrnRegexModule,
  ],
  exports: [RegexCheckBasicComponent],
})
export class RegexCheckBasicModule {}
