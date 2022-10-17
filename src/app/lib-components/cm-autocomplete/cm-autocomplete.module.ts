import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmAutocompleteBasicModule } from '../cm-autocomplete-basic/cm-autocomplete-basic.module';

import { CmAutocompleteComponent } from './cm-autocomplete.component';
import { CmAutocompleteRoutingModule } from './cm-autocomplete-routing.module';

@NgModule({
  declarations: [CmAutocompleteComponent],
  imports: [CommonModule, CmAutocompleteBasicModule, CmAutocompleteRoutingModule],
  exports: [CmAutocompleteComponent],
})
export class CmAutocompleteModule {}
