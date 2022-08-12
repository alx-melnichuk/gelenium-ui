import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';

import { LmDirectivesComponent } from './lm-directives.component';
import { LmDirectivesRoutingModule } from './lm-directives-routing.module';

@NgModule({
  declarations: [LmDirectivesComponent],
  imports: [CommonModule, MatExpansionModule, SiteSchemeModule, LmDirectivesRoutingModule],
  exports: [LmDirectivesComponent],
})
export class LmDirectivesModule {}
