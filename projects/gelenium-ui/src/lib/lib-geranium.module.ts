import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { LibGeraniumService } from './lib-geranium.service';

@NgModule({
  declarations: [],
  imports: [OverlayModule, PortalModule],
  exports: [],
  providers: [LibGeraniumService],
})
export class LibGeraniumModule {}
