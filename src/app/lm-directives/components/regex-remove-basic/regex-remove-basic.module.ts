import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/lib-geranium/src/lib/grn-input/grn-input.module';
import { LibDirectivesModule } from 'projects/lib-geranium/src/lib/directives/lib-directives.module';

import { RegexRemoveBasicComponent } from './regex-remove-basic.component';

@NgModule({
  declarations: [RegexRemoveBasicComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GrnInputModule,
    LibDirectivesModule,
  ],
  exports: [RegexRemoveBasicComponent],
})
export class RegexRemoveBasicModule {}
