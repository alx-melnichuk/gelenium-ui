import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnLayerComponent } from './gln-layer.component';

@NgModule({
  declarations: [GlnLayerComponent],
  imports: [CommonModule],
  exports: [GlnLayerComponent],
  entryComponents: [GlnLayerComponent],
})
export class GlnLayerModule {}
