import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'projects/gelenium-ui/src/lib/gln-button/gln-button.module';

import { ButtonConfigComponent } from './button-config.component';

@NgModule({
  declarations: [ButtonConfigComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [ButtonConfigComponent],
})
export class ButtonConfigModule {}
