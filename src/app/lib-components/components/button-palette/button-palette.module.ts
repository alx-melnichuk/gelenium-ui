import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // routerLink
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnButtonModule } from 'projects/lib-geranium/src/lib/grn-button/grn-button.module';

import { ButtonPaletteComponent } from './button-palette.component';

@NgModule({
  declarations: [ButtonPaletteComponent],
  imports: [CommonModule, FormsModule, RouterModule, MatExpansionModule, MatTabsModule, GrnButtonModule],
  exports: [ButtonPaletteComponent],
})
export class ButtonPaletteModule {}
