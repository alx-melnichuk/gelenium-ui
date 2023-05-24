import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnDatepickerModule } from 'gelenium-ui';

import { CmDatepickerBasicComponent } from './cm-datepicker-basic.component';

@NgModule({
  declarations: [CmDatepickerBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnDatepickerModule],
  exports: [CmDatepickerBasicComponent],
})
export class CmDatepickerBasicModule {}
