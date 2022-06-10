import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';
import { LibComponentsModule } from '../lib-components/lib-components.module';

import { LmComponentsComponent } from './lm-components.component';
// This module should be the last one.
import { LmComponentsRoutingModule } from './lm-components-routing.module';

@NgModule({
  declarations: [LmComponentsComponent],
  imports: [CommonModule, MatExpansionModule, FormsModule, SiteSchemeModule, LibComponentsModule, LmComponentsRoutingModule],
  exports: [LmComponentsComponent],
})
export class LmComponentsModule {}
