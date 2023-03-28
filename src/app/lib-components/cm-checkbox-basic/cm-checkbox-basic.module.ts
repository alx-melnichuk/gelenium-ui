import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCheckboxModule } from 'gelenium-ui';

import { CmCheckboxBasicComponent } from './cm-checkbox-basic.component';

@NgModule({
  declarations: [CmCheckboxBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCheckboxModule],
  exports: [CmCheckboxBasicComponent],
})
export class CmCheckboxBasicModule {}
