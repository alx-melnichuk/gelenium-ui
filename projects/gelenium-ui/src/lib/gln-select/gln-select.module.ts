import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnFrameExteriorInputModule } from '../directives/gln-frame-exterior-input/gln-frame-exterior-input.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';
import { GlnMenuItemModule } from '../gln-menu-item/gln-menu-item.module';
import { GlnMenuItemBarShowModule } from '../gln-menu-item-bar-show/gln-menu-item-bar-show.module';

import { GlnSelectComponent } from './gln-select.component';

@NgModule({
  declarations: [GlnSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GlnFrameExteriorInputModule,
    GlnFrameModule,
    GlnFrameOrnamentModule,
    GlnFrameSizeModule,
    GlnHintOrErrorModule,
    GlnMenuItemModule,
    GlnMenuItemBarShowModule,
  ],
  exports: [GlnSelectComponent],
})
export class GlnSelectModule {}
