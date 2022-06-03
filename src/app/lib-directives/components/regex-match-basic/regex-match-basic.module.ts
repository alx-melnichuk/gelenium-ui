import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'projects/gelenium-ui/src/lib/gln-input/gln-input.module';
import { GlnRegexModule } from 'projects/gelenium-ui/src/lib/directives/gln-regex/gln-regex.module';

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
    GlnInputModule,
    GlnRegexModule,
  ],
  exports: [RegexMatchBasicComponent],
})
export class RegexMatchBasicModule {}
