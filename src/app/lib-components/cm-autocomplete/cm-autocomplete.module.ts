import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmAutocompleteBasicModule } from '../cm-autocomplete-basic/cm-autocomplete-basic.module';
import { CmAutocompleteAttributesModule } from '../cm-autocomplete-attributes/cm-autocomplete-attributes.module';
import { CmAutocompleteAsynchronyModule } from '../cm-autocomplete-asynchrony/cm-autocomplete-asynchrony.module';

import { CmAutocompleteComponent } from './cm-autocomplete.component';
import { CmAutocompleteRoutingModule } from './cm-autocomplete-routing.module';

@NgModule({
  declarations: [CmAutocompleteComponent],
  imports: [
    CommonModule,
    CmAutocompleteBasicModule,
    CmAutocompleteAttributesModule,
    CmAutocompleteAsynchronyModule,
    CmAutocompleteRoutingModule,
  ],
  exports: [CmAutocompleteComponent],
})
export class CmAutocompleteModule {}
