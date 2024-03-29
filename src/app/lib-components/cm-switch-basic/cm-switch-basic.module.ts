import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSwitchModule } from 'gelenium-ui';

import { CmSwitchBasicComponent } from './cm-switch-basic.component';

@NgModule({
  declarations: [CmSwitchBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnSwitchModule],
  exports: [CmSwitchBasicComponent],
})
export class CmSwitchBasicModule {}
