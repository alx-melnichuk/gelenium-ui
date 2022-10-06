import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'gelenium-ui';

import { CmInputConfigComponent } from './cm-input-config.component';

@NgModule({
  declarations: [CmInputConfigComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [CmInputConfigComponent],
})
export class CmInputConfigModule {}
