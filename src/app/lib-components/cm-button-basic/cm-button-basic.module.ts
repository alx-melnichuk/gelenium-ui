import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'gelenium-ui';

import { CmButtonBasicComponent } from './cm-button-basic.component';

@NgModule({
  declarations: [CmButtonBasicComponent],
  imports: [CommonModule, RouterModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [CmButtonBasicComponent],
})
export class CmButtonBasicModule {}
