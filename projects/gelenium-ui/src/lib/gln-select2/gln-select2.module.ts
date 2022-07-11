import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnlSelectRootComponent, GlnSelect2Component, GlnSelectOptionComponent } from './gln-select2.component';

@NgModule({
  declarations: [GlnSelect2Component, GlnlSelectRootComponent, GlnSelectOptionComponent],
  imports: [CommonModule],
  exports: [GlnSelect2Component, GlnlSelectRootComponent, GlnSelectOptionComponent],
})
export class GlnSelect2Module {}
