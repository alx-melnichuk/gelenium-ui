import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputBasicModule } from '../input-basic/input-basic.module';
import { InputAttributesModule } from '../input-attributes/input-attributes.module';
import { InputValidationModule } from '../input-validation/input-validation.module';
import { InputNumericalValueModule } from '../input-numerical-value/input-numerical-value.module';
import { InputPaletteCustomizationModule } from '../input-palette-customization/input-palette-customization.module';
import { InputOrnamentsModule } from '../input-ornaments/input-ornaments.module';
import { InputBorderRadiusModule } from '../input-border-radius/input-border-radius.module';
import { InputApiModule } from '../input-api/input-api.module';

import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    InputBasicModule,
    InputAttributesModule,
    InputValidationModule,
    InputNumericalValueModule,
    InputPaletteCustomizationModule,
    InputOrnamentsModule,
    InputBorderRadiusModule,
    InputApiModule,
  ],
})
export class InputModule {}
