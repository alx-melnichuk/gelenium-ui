import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnHintOrErrorModule } from 'gelenium-ui';

import { CmHintOrErrorBasicComponent } from './cm-hint-or-error-basic.component';

@NgModule({
  declarations: [CmHintOrErrorBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnHintOrErrorModule],
  exports: [CmHintOrErrorBasicComponent],
})
export class CmHintOrErrorBasicModule {}
