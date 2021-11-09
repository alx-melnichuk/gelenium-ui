import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnInputModule } from 'projects/lib-geranium/src/lib/grn-input/grn-input.module';

import { InputComponent } from './input.component';

import { InputBasicModule } from '../input-basic/input-basic.module';
import { InputAttributesModule } from '../input-attributes/input-attributes.module';
import { InputValidationModule } from '../input-validation/input-validation.module';
import { InputItemSizeModule } from '../input-item-size/input-item-size.module';
import { InputNumericalValueModule } from '../input-numerical-value/input-numerical-value.module';
import { InputHelperTextModule } from '../input-helper-text/input-helper-text.module';
import { InputPaletteCustomizationModule } from '../input-palette-customization/input-palette-customization.module';
import { InputOrnamentsModule } from '../input-ornaments/input-ornaments.module';
import { InputBorderRadiusModule } from '../input-border-radius/input-border-radius.module';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GrnInputModule,
    InputBasicModule,
    InputAttributesModule,
    InputValidationModule,
    InputItemSizeModule,
    InputNumericalValueModule,
    InputHelperTextModule,
    InputPaletteCustomizationModule,
    InputOrnamentsModule,
    InputBorderRadiusModule,
  ],
})
export class InputModule {}
