import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms'; // Required for the "formGroup" form attribute.

import { GlnFrameExteriorInputModule } from '../directives/gln-frame-exterior-input/gln-frame-exterior-input.module';
import { GlnFrameModule } from '../gln-frame/gln-frame.module';
import { GlnFrameOrnamentModule } from '../directives/gln-frame-ornament/gln-frame-ornament.module';
import { GlnFrameSizeModule } from '../directives/gln-frame-size/gln-frame-size.module';
import { GlnHintOrErrorModule } from '../gln-hint-or-error/gln-hint-or-error.module';
import { GlnMenuItemModule } from '../gln-menu-item/gln-menu-item.module';
import { GlnMenuItemPanelShowModule } from '../gln-menu-item-panel-show/gln-menu-item-panel-show.module';

import { GlnSelectComponent } from './gln-select.component';
import { GLN_SELECT_SCROLL_STRATEGY_PROVIDER } from './gln-select.providers';

@NgModule({
  declarations: [GlnSelectComponent],
  imports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule,
    GlnFrameExteriorInputModule,
    GlnFrameModule,
    GlnFrameOrnamentModule,
    GlnFrameSizeModule,
    GlnHintOrErrorModule,
    GlnMenuItemModule,
    GlnMenuItemPanelShowModule,
  ],
  exports: [GlnSelectComponent],
  providers: [GLN_SELECT_SCROLL_STRATEGY_PROVIDER],
})
export class GlnSelectModule {}
