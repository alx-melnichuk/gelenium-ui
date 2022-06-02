import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/gelenium-ui/src/lib/grn-input/grn-input.module';
import { GrnRegexModule } from 'projects/gelenium-ui/src/lib/directives/grn-regex/grn-regex.module';

import { RegexMatchBasicComponent } from './regex-match-basic.component';

@NgModule({
  declarations: [RegexMatchBasicComponent],
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
  exports: [RegexMatchBasicComponent],
})
export class RegexMatchBasicModule {}
