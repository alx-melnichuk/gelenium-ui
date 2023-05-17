import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, // Contains: "[(ngModel)]"
  ReactiveFormsModule, // Contains: FormGroup, FormControl
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnCheckboxModule } from 'gelenium-ui';

import { CmCheckboxAttributesComponent } from './cm-checkbox-attributes.component';

@NgModule({
  declarations: [CmCheckboxAttributesComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnCheckboxModule],
  exports: [CmCheckboxAttributesComponent],
})
export class CmCheckboxAttributesModule {}
