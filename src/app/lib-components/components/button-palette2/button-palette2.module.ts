import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // routerLink
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'gelenium-ui';

import { ButtonPalette2Component } from './button-palette2.component';

@NgModule({
  declarations: [ButtonPalette2Component],
  imports: [CommonModule, FormsModule, RouterModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [ButtonPalette2Component],
})
export class ButtonPalette2Module {}
