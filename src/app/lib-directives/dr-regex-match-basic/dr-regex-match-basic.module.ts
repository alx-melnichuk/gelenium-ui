import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule, GlnRegexModule } from 'gelenium-ui';

import { DrRegexMatchBasicComponent } from './dr-regex-match-basic.component';

@NgModule({
  declarations: [DrRegexMatchBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule, GlnRegexModule],
  exports: [DrRegexMatchBasicComponent],
})
export class DrRegexMatchBasicModule {}
