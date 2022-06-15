import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnSelectModule } from 'gelenium-ui';

import { SelectBasicComponent } from './select-basic.component';

@NgModule({
  declarations: [SelectBasicComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnSelectModule],
  exports: [SelectBasicComponent],
})
export class SelectBasicModule {}
