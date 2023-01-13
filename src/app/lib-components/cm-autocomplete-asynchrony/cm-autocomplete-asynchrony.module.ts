import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnAutocompleteModule, GlnInputModule, GlnOptionModule } from 'gelenium-ui';

import { CmAutocompleteAsynchronyComponent } from './cm-autocomplete-asynchrony.component';

@NgModule({
  declarations: [CmAutocompleteAsynchronyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnAutocompleteModule,
    GlnInputModule,
    GlnOptionModule,
  ],
  exports: [CmAutocompleteAsynchronyComponent],
})
export class CmAutocompleteAsynchronyModule {}
