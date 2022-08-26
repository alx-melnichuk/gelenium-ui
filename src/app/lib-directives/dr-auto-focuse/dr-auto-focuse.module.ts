import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrAutoFocuseBasicModule } from '../dr-auto-focuse-basic/dr-auto-focuse-basic.module';
import { DrAutoFocuseApiModule } from '../dr-auto-focuse-api/dr-auto-focuse-api.module';

import { DrAutoFocuseComponent } from './dr-auto-focuse.component';
import { DrAutoFocuseRoutingModule } from './dr-auto-focuse-routing.module';

@NgModule({
  declarations: [DrAutoFocuseComponent],
  imports: [CommonModule, DrAutoFocuseBasicModule, DrAutoFocuseApiModule, DrAutoFocuseRoutingModule],
  exports: [DrAutoFocuseComponent],
})
export class DrAutoFocuseModule {}
