import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'gelenium-ui';

import { CmFrameConfigComponent } from './cm-frame-config.component';

@NgModule({
  declarations: [CmFrameConfigComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [CmFrameConfigComponent],
})
export class CmFrameConfigModule {}
