import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnInputModule } from 'gelenium-ui';

import { PlInputBasicComponent } from './pl-input-basic.component';

@NgModule({
  declarations: [PlInputBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnColorModule, GlnInputModule],
  exports: [PlInputBasicComponent],
})
export class PlInputBasicModule {}
