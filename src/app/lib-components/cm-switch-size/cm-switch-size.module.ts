import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSwitchModule } from 'gelenium-ui';

import { CmSwitchSizeComponent } from './cm-switch-size.component';

@NgModule({
  declarations: [CmSwitchSizeComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSwitchModule],
  exports: [CmSwitchSizeComponent],
})
export class CmSwitchSizeModule {}
