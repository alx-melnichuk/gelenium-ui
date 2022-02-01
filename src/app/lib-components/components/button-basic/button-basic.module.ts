import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

import { GrnButtonModule } from 'projects/lib-geranium/src/lib/grn-button/grn-button.module';
import { GrnTouchRippleModule } from 'projects/lib-geranium/src/lib/grn-touch-ripple/grn-touch-ripple.module';

import { ButtonBasicComponent } from './button-basic.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ButtonBasicComponent],
  imports: [CommonModule, RouterModule, MatExpansionModule, MatTabsModule, GrnButtonModule, GrnTouchRippleModule],
  exports: [ButtonBasicComponent],
})
export class ButtonBasicModule {}
