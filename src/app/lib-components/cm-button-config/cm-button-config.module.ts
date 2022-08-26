import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnButtonModule } from 'gelenium-ui';

import { CmButtonConfigComponent } from './cm-button-config.component';

@NgModule({
  declarations: [CmButtonConfigComponent],
  imports: [CommonModule, MatExpansionModule, MatTabsModule, GlnButtonModule],
  exports: [CmButtonConfigComponent],
})
export class CmButtonConfigModule {}
