import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCheckboxModule } from 'gelenium-ui';

import { CmCheckboxSizeComponent } from './cm-checkbox-size.component';

@NgModule({
  declarations: [CmCheckboxSizeComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCheckboxModule],
  exports: [CmCheckboxSizeComponent],
})
export class CmCheckboxSizeModule {}
