import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnAutocompleteModule, GlnInputModule } from 'gelenium-ui';

import { CmAutocompleteBasicComponent } from './cm-autocomplete-basic.component';

@NgModule({
  declarations: [CmAutocompleteBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnAutocompleteModule, GlnInputModule],
  exports: [CmAutocompleteBasicComponent],
})
export class CmAutocompleteBasicModule {}
