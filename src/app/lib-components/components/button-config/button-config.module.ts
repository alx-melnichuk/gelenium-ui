import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GrnButtonModule } from 'projects/gelenium-ui/src/lib/grn-button/grn-button.module';

import { ButtonConfigComponent } from './button-config.component';

@NgModule({
  declarations: [ButtonConfigComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GrnButtonModule],
  exports: [ButtonConfigComponent],
})
export class ButtonConfigModule {}
