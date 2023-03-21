import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmSpinnerBasicModule } from '../cm-spinner-basic/cm-spinner-basic.module';
import { CmSpinnerAttributesModule } from '../cm-spinner-attributes/cm-spinner-attributes.module';
import { CmSpinnerSizeModule } from '../cm-spinner-size/cm-spinner-size.module';
import { CmSpinnerPaletteModule } from '../cm-spinner-palette/cm-spinner-palette.module';
import { CmSpinnerCustomizationModule } from '../cm-spinner-customization/cm-spinner-customization.module';
import { CmSpinnerConfigModule } from '../cm-spinner-config/cm-spinner-config.module';
import { CmSpinnerApiModule } from '../cm-spinner-api/cm-spinner-api.module';

import { CmSpinnerComponent } from './cm-spinner.component';
import { CmSpinnerRoutingModule } from './cm-spinner-routing.module';

@NgModule({
  declarations: [CmSpinnerComponent],
  imports: [
    CommonModule,
    CmSpinnerBasicModule,
    CmSpinnerAttributesModule,
    CmSpinnerSizeModule,
    CmSpinnerPaletteModule,
    CmSpinnerCustomizationModule,
    CmSpinnerConfigModule,
    CmSpinnerApiModule,
    CmSpinnerRoutingModule,
  ],
  exports: [CmSpinnerComponent],
})
export class CmSpinnerModule {}
