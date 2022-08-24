import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrRegexRemoveBasicModule } from '../dr-regex-remove-basic/dr-regex-remove-basic.module';
import { DrRegexRemoveApiModule } from '../dr-regex-remove-api/dr-regex-remove-api.module';

import { DrRegexRemoveComponent } from './dr-regex-remove.component';
import { DrRegexRemoveRoutingModule } from './dr-regex-remove-routing.module';

@NgModule({
  declarations: [DrRegexRemoveComponent],
  imports: [CommonModule, DrRegexRemoveBasicModule, DrRegexRemoveApiModule, DrRegexRemoveRoutingModule],
  exports: [DrRegexRemoveComponent],
})
export class DrRegexRemoveModule {}
