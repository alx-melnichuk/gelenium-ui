import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/gelenium-ui/src/lib/grn-input/grn-input.module';
import { GrnRegexModule } from 'projects/gelenium-ui/src/lib/directives/grn-regex/grn-regex.module';

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
    GrnRegexModule,
  ],
  exports: [InputOrnamentsComponent],
})
export class InputOrnamentsModule {}
