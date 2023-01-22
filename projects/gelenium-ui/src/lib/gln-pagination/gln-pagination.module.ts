import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnButtonModule } from '../gln-button/gln-button.module';

import { GlnPaginationComponent } from './gln-pagination.component';

@NgModule({
  declarations: [GlnPaginationComponent],
  imports: [CommonModule, GlnButtonModule],
  exports: [GlnPaginationComponent],
})
export class GlnPaginationModule {}
