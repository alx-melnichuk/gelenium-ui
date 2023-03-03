import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SiteSchemeComponent } from './site-scheme.component';

@NgModule({
  declarations: [SiteSchemeComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [SiteSchemeComponent],
})
export class SiteSchemeModule {}
