import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdStartGettingStartedModule } from '../gd-start-getting-started/gd-start-getting-started.module';

import { GdStartComponent } from './gd-start.component';
import { GdStartRoutingModule } from './gd-start-routing.module';

@NgModule({
  declarations: [GdStartComponent],
  imports: [CommonModule, GdStartRoutingModule, GdStartGettingStartedModule],
  exports: [GdStartComponent],
})
export class GdStartModule {}
