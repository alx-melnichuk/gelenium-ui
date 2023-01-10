import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmAutocompleteBasicModule } from '../cm-autocomplete-basic/cm-autocomplete-basic.module';
import { CmAutocompleteAttributesModule } from '../cm-autocomplete-attributes/cm-autocomplete-attributes.module';
import { CmAutocompleteAsynchronyModule } from '../cm-autocomplete-asynchrony/cm-autocomplete-asynchrony.module';
import { CmAutocompleteFeatureModule } from '../cm-autocomplete-feature/cm-autocomplete-feature.module';
import { CmAutocompleteConfigModule } from '../cm-autocomplete-config/cm-autocomplete-config.module';
import { CmAutocompleteApiModule } from '../cm-autocomplete-api/cm-autocomplete-api.module';

import { CmAutocompleteComponent } from './cm-autocomplete.component';
import { CmAutocompleteRoutingModule } from './cm-autocomplete-routing.module';

@NgModule({
  declarations: [CmAutocompleteComponent],
  imports: [
    CommonModule,
    CmAutocompleteBasicModule,
    CmAutocompleteAttributesModule,
    CmAutocompleteAsynchronyModule,
    CmAutocompleteFeatureModule,
    CmAutocompleteConfigModule,
    CmAutocompleteApiModule,
    CmAutocompleteRoutingModule,
  ],
  exports: [CmAutocompleteComponent],
})
export class CmAutocompleteModule {}
