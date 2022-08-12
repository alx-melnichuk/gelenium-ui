import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoFocuseBasicModule } from '../auto-focuse-basic/auto-focuse-basic.module';
import { AutoFocuseApiModule } from '../auto-focuse-api/auto-focuse-api.module';

import { AutoFocuseComponent } from './auto-focuse.component';
import { AutoFocuseRoutingModule } from './auto-focuse-routing.module';

@NgModule({
  declarations: [AutoFocuseComponent],
  imports: [CommonModule, AutoFocuseBasicModule, AutoFocuseApiModule, AutoFocuseRoutingModule],
  exports: [AutoFocuseComponent],
})
export class AutoFocuseModule {}
