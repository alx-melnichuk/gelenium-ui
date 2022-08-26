import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { SiteSchemeModule } from '../lib-site/site-scheme/site-scheme.module';

import { LmGuidesComponent } from './lm-guides.component';
import { LmGuidesRoutingModule } from './lm-guides-routing.module';

@NgModule({
  declarations: [LmGuidesComponent],
  imports: [CommonModule, MatExpansionModule, SiteSchemeModule, LmGuidesRoutingModule],
})
export class LmGuidesModule {}
