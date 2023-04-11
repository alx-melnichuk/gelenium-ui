import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule, // Contains: "[(ngModel)]"
  ReactiveFormsModule, // Contains: FormGroup, FormControl
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnRadioButtonModule, GlnRadioGroupModule } from 'gelenium-ui';

import { CmRadioBasicComponent } from './cm-radio-basic.component';

@NgModule({
  declarations: [CmRadioBasicComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatTabsModule, GlnRadioButtonModule, GlnRadioGroupModule],
  exports: [CmRadioBasicComponent],
})
export class CmRadioBasicModule {}
