import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnHintOrErrorModule } from 'projects/gelenium-ui/src/lib/grn-hint-or-error/grn-hint-or-error.module';

import { HintOrErrorBasicComponent } from './hint-or-error-basic.component';

@NgModule({
  declarations: [HintOrErrorBasicComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GrnHintOrErrorModule],
  exports: [HintOrErrorBasicComponent],
})
export class HintOrErrorBasicModule {}
