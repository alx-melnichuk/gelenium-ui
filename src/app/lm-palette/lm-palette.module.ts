import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { SiteSchemeModule } from '../lib-site/components/site-scheme/site-scheme.module';

import { LmPaletteComponent } from './lm-palette.component';
import { LmPaletteRoutingModule } from './lm-palette-routing.module';

@NgModule({
  declarations: [LmPaletteComponent],
  imports: [CommonModule, MatExpansionModule, SiteSchemeModule, LmPaletteRoutingModule],
})
export class LmPaletteModule {}
