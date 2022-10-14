import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSwitchModule } from 'gelenium-ui';

import { CmSwitchAttributesComponent } from './cm-switch-attributes.component';

@NgModule({
  declarations: [CmSwitchAttributesComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSwitchModule],
  exports: [CmSwitchAttributesComponent],
})
export class CmSwitchAttributesModule {}
