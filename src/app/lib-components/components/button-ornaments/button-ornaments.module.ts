import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ngModel
import { RouterModule } from '@angular/router'; // routerLink
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnButtonModule } from 'projects/gelenium-ui/src/lib/grn-button/grn-button.module';

import { ButtonOrnamentsComponent } from './button-ornaments.component';

@NgModule({
  declarations: [ButtonOrnamentsComponent],
  imports: [CommonModule, FormsModule, RouterModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GrnButtonModule],
  exports: [ButtonOrnamentsComponent],
})
export class ButtonOrnamentsModule {}
