import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // routerLink

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'gelenium-ui';

import { CmButtonAttributesComponent } from './cm-button-attributes.component';

@NgModule({
  declarations: [CmButtonAttributesComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [CmButtonAttributesComponent],
})
export class CmButtonAttributesModule {}
