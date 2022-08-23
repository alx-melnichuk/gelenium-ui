import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ngModel
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnInputModule } from 'gelenium-ui';

import { CmFrameBorderRadiusComponent } from './cm-frame-border-radius.component';

@NgModule({
  declarations: [CmFrameBorderRadiusComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnInputModule],
  exports: [CmFrameBorderRadiusComponent],
})
export class CmFrameBorderRadiusModule {}
