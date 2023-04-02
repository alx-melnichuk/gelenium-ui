import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCheckboxModule, GlnColorModule } from 'gelenium-ui';

import { PlCheckboxBasicComponent } from './pl-checkbox-basic.component';

@NgModule({
  declarations: [PlCheckboxBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCheckboxModule, GlnColorModule],
  exports: [PlCheckboxBasicComponent],
})
export class PlCheckboxBasicModule {}
