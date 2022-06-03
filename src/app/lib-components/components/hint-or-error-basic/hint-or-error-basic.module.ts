import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnHintOrErrorModule } from 'projects/gelenium-ui/src/lib/gln-hint-or-error/gln-hint-or-error.module';

import { HintOrErrorBasicComponent } from './hint-or-error-basic.component';

@NgModule({
  declarations: [HintOrErrorBasicComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnHintOrErrorModule],
  exports: [HintOrErrorBasicComponent],
})
export class HintOrErrorBasicModule {}
