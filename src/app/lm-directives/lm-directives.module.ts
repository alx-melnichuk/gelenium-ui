import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { LmDirectivesComponent } from './lm-directives.component';
import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';
import { RegexCheckModule } from './components/regex-check/regex-check.module';
import { RegexMatchModule } from './components/regex-match/regex-match.module';
import { RegexRemoveModule } from './components/regex-remove/regex-remove.module';
// This module should be the last one.
import { LmDirectivesRoutingModule } from './lm-directives-routing.module';

@NgModule({
  declarations: [LmDirectivesComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    LmDirectivesRoutingModule,
    SiteSchemeModule,
    RegexCheckModule,
    RegexMatchModule,
    RegexRemoveModule,
  ],
})
export class LmDirectivesModule {}
