import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnButtonModule } from 'projects/gelenium-ui/src/lib/grn-button/grn-button.module';

import { ButtonBasicComponent } from './button-basic.component';

@NgModule({
  declarations: [ButtonBasicComponent],
  imports: [CommonModule, RouterModule, MatExpansionModule, MatTabsModule, GrnButtonModule],
  exports: [ButtonBasicComponent],
})
export class ButtonBasicModule {}
