import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ngModel
import { RouterModule } from '@angular/router'; // routerLink
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'projects/gelenium-ui/src/lib/gln-button/gln-button.module';

import { ButtonBorderRadiusComponent } from './button-border-radius.component';

@NgModule({
  declarations: [ButtonBorderRadiusComponent],
  imports: [CommonModule, FormsModule, RouterModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [ButtonBorderRadiusComponent],
})
export class ButtonBorderRadiusModule {}
