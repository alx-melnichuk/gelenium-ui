import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionModule, GlnSelectModule } from 'gelenium-ui';

import { SelectConfigComponent } from './select-config.component';

@NgModule({
  declarations: [SelectConfigComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnOptionModule, GlnSelectModule],
  exports: [SelectConfigComponent],
})
export class SelectConfigModule {}
