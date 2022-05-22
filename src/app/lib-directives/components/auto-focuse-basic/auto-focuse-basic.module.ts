import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { AutoFocuseBasicComponent } from './auto-focuse-basic.component';

import { GrnAutoFocuseModule } from 'projects/lib-geranium/src/public-api';

@NgModule({
  declarations: [AutoFocuseBasicComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GrnAutoFocuseModule],
  exports: [AutoFocuseBasicComponent],
})
export class AutoFocuseBasicModule {}
