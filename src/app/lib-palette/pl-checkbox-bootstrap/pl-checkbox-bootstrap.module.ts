import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCheckboxModule } from 'gelenium-ui';

import { PlCheckboxBootstrapComponent } from './pl-checkbox-bootstrap.component';

@NgModule({
  declarations: [PlCheckboxBootstrapComponent],
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCheckboxModule],
  exports: [PlCheckboxBootstrapComponent],
})
export class PlCheckboxBootstrapModule {}
