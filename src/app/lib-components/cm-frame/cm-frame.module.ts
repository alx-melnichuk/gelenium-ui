import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmFrameBasicModule } from '../cm-frame-basic/cm-frame-basic.module';
import { CmFrameAttributesModule } from '../cm-frame-attributes/cm-frame-attributes.module';
import { CmFrameSizeModule } from '../cm-frame-size/cm-frame-size.module';
import { CmFrameLabelModule } from '../cm-frame-label/cm-frame-label.module';
import { CmFrameHelperTextModule } from '../cm-frame-helper-text/cm-frame-helper-text.module';
import { CmFrameBorderRadiusModule } from '../cm-frame-border-radius/cm-frame-border-radius.module';
import { CmFrameFeatureModule } from '../cm-frame-feature/cm-frame-feature.module';
import { CmFrameStructureModule } from '../cm-frame-structure/cm-frame-structure.module';
import { CmFrameConfigModule } from '../cm-frame-config/cm-frame-config.module';
import { CmFrameApiModule } from '../cm-frame-api/cm-frame-api.module';

import { CmFrameComponent } from './cm-frame.component';
import { CmFrameRoutingModule } from './cm-frame-routing.module';

@NgModule({
  declarations: [CmFrameComponent],
  imports: [
    CommonModule,
    CmFrameBasicModule,
    CmFrameAttributesModule,
    CmFrameSizeModule,
    CmFrameLabelModule,
    CmFrameHelperTextModule,
    CmFrameBorderRadiusModule,
    CmFrameFeatureModule,
    CmFrameStructureModule,
    CmFrameConfigModule,
    CmFrameApiModule,
    CmFrameRoutingModule,
  ],
  exports: [CmFrameComponent],
})
export class CmFrameModule {}
