import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionListModule, GlnAutocompleteModule, GlnInputModule, GlnSelectModule } from 'gelenium-ui';

import { CmAutocompleteBasicComponent } from './cm-autocomplete-basic.component';

@NgModule({
  declarations: [CmAutocompleteBasicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnAutocompleteModule,
    GlnOptionListModule,
    GlnSelectModule,
    GlnInputModule,
  ],
  exports: [CmAutocompleteBasicComponent],
})
export class CmAutocompleteBasicModule {}
