import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionModule, GlnSelectModule } from 'gelenium-ui';

import { CmSelectBasicComponent } from './cm-select-basic.component';

@NgModule({
  declarations: [CmSelectBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSelectModule, GlnOptionModule],
  exports: [CmSelectBasicComponent],
})
export class CmSelectBasicModule {}
