import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';

import { LmComponentsComponent } from './lm-components.component';
import { LmComponentsRoutingModule } from './lm-components-routing.module';

@NgModule({
  declarations: [LmComponentsComponent],
  imports: [CommonModule, MatExpansionModule, SiteSchemeModule, LmComponentsRoutingModule],
  exports: [LmComponentsComponent],
})
export class LmComponentsModule {}
