import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule, GlnColorModule } from 'gelenium-ui';

import { PlButtonBasicComponent } from './pl-button-basic.component';

@NgModule({
  declarations: [PlButtonBasicComponent],
  imports: [CommonModule, RouterModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnButtonModule, GlnColorModule],
  exports: [PlButtonBasicComponent],
})
export class PlButtonBasicModule {}
