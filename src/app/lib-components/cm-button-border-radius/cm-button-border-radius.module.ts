import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ngModel
import { RouterModule } from '@angular/router'; // routerLink
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'gelenium-ui';

import { CmButtonBorderRadiusComponent } from './cm-button-border-radius.component';

@NgModule({
  declarations: [CmButtonBorderRadiusComponent],
  imports: [CommonModule, FormsModule, RouterModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [CmButtonBorderRadiusComponent],
})
export class CmButtonBorderRadiusModule {}
