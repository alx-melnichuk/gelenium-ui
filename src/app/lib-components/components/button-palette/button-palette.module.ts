import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // routerLink
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'projects/gelenium-ui/src/lib/gln-button/gln-button.module';

import { ButtonPaletteComponent } from './button-palette.component';

@NgModule({
  declarations: [ButtonPaletteComponent],
  imports: [CommonModule, FormsModule, RouterModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [ButtonPaletteComponent],
})
export class ButtonPaletteModule {}
