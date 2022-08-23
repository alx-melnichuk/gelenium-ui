import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionModule, GlnSelectModule } from 'gelenium-ui';

import { CmSelectConfigComponent } from './cm-select-config.component';

@NgModule({
  declarations: [CmSelectConfigComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnOptionModule, GlnSelectModule],
  exports: [CmSelectConfigComponent],
})
export class CmSelectConfigModule {}
