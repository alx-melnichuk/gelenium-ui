import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';
import { LibDirectivesModule } from '../lib-directives/lib-directives.module';

import { LmDirectivesComponent } from './lm-directives.component';
// This module should be the last one.
import { LmDirectivesRoutingModule } from './lm-directives-routing.module';

@NgModule({
  declarations: [LmDirectivesComponent],
  imports: [CommonModule, MatExpansionModule, LmDirectivesRoutingModule, SiteSchemeModule, LibDirectivesModule],
  exports: [LmDirectivesComponent],
})
export class LmDirectivesModule {}
