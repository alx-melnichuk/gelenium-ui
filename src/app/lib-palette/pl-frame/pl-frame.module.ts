import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlFrameCustomerModule } from '../pl-frame-customer/pl-frame-customer.module';

import { PlFrameRoutingModule } from './pl-frame-routing.module';
import { PlFrameComponent } from './pl-frame.component';

@NgModule({
  declarations: [PlFrameComponent],
  imports: [CommonModule, PlFrameRoutingModule, PlFrameCustomerModule],
  exports: [PlFrameComponent],
})
export class PlFrameModule {}
