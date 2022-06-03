import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // routerLink
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'projects/gelenium-ui/src/lib/gln-button/gln-button.module';

import { ButtonBasicComponent } from './button-basic.component';

@NgModule({
  declarations: [ButtonBasicComponent],
  imports: [CommonModule, RouterModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [ButtonBasicComponent],
})
export class ButtonBasicModule {}
