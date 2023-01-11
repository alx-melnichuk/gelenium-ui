import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnAutocompleteModule, GlnInputModule, GlnOptionModule, GlnHighlightModule } from 'gelenium-ui';

import { CmAutocompleteFeatureComponent } from './cm-autocomplete-feature.component';

@NgModule({
  declarations: [CmAutocompleteFeatureComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnAutocompleteModule,
    GlnInputModule,
    GlnOptionModule,
    GlnHighlightModule,
  ],
  exports: [CmAutocompleteFeatureComponent],
})
export class CmAutocompleteFeatureModule {}
