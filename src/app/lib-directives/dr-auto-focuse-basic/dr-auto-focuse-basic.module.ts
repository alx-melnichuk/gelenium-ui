import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnAutoFocuseModule } from 'gelenium-ui';

import { DrAutoFocuseBasicComponent } from './dr-auto-focuse-basic.component';

@NgModule({
  declarations: [DrAutoFocuseBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnAutoFocuseModule],
  exports: [DrAutoFocuseBasicComponent],
})
export class DrAutoFocuseBasicModule {}
