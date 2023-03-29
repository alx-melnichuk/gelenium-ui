import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, // Contains: "[(ngModel)]"
  ReactiveFormsModule, // Contains: FormGroup, FormControl
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCheckboxModule, GlnColorModule } from 'gelenium-ui'; // GlnColorModule only for page: Palette.

import { CmCheckboxBasicComponent } from './cm-checkbox-basic.component';

@NgModule({
  declarations: [CmCheckboxBasicComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCheckboxModule, GlnColorModule],
  exports: [CmCheckboxBasicComponent],
})
export class CmCheckboxBasicModule {}
