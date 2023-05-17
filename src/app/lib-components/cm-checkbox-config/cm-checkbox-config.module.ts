import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCheckboxModule } from 'gelenium-ui';

import { CmCheckboxConfigComponent } from './cm-checkbox-config.component';

@NgModule({
  declarations: [CmCheckboxConfigComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCheckboxModule],
  exports: [CmCheckboxConfigComponent],
})
export class CmCheckboxConfigModule {}
