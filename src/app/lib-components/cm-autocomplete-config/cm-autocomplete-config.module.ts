import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnAutocompleteModule, GlnInputModule, GlnOptionModule } from 'gelenium-ui';

import { CmAutocompleteConfigComponent } from './cm-autocomplete-config.component';

@NgModule({
  declarations: [CmAutocompleteConfigComponent],
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
  exports: [CmAutocompleteConfigComponent],
})
export class CmAutocompleteConfigModule {}
