import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSwitchModule } from 'gelenium-ui';

import { CmSwitchCustomizationComponent } from './cm-switch-customization.component';

@NgModule({
  declarations: [CmSwitchCustomizationComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnSwitchModule],
  exports: [CmSwitchCustomizationComponent],
})
export class CmSwitchCustomizationModule {}
