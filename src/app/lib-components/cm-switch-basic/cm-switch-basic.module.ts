import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ngModel - FormsModule
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnColorModule, GlnSwitchModule } from 'gelenium-ui';

import { CmSwitchBasicComponent } from './cm-switch-basic.component';

@NgModule({
  declarations: [CmSwitchBasicComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnColorModule,
    GlnSwitchModule,
  ],
  exports: [CmSwitchBasicComponent],
})
export class CmSwitchBasicModule {}
