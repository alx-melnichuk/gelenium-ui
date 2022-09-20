import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmSwitchBasicModule } from '../cm-switch-basic/cm-switch-basic.module';

import { CmSwitchComponent } from './cm-switch.component';
import { CmSwitchRoutingModule } from './cm-switch-routing.module';

@NgModule({
  declarations: [CmSwitchComponent],
  imports: [CommonModule, CmSwitchBasicModule, CmSwitchRoutingModule],
  exports: [CmSwitchComponent],
})
export class CmSwitchModule {}
