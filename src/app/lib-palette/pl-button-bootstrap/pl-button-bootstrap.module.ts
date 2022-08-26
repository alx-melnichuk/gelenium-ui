import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'gelenium-ui';

import { PlButtonBootstrapComponent } from './pl-button-bootstrap.component';

@NgModule({
  declarations: [PlButtonBootstrapComponent],
  imports: [CommonModule, RouterModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [PlButtonBootstrapComponent],
})
export class PlButtonBootstrapModule {}
