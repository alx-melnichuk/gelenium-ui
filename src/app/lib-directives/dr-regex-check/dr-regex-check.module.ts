import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrRegexCheckBasicModule } from '../dr-regex-check-basic/dr-regex-check-basic.module';
import { DrRegexCheckApiModule } from '../dr-regex-check-api/dr-regex-check-api.module';

import { DrRegexCheckComponent } from './dr-regex-check.component';
import { DrRegexCheckRoutingModule } from './dr-regex-check-routing.module';

@NgModule({
  declarations: [DrRegexCheckComponent],
  imports: [CommonModule, DrRegexCheckBasicModule, DrRegexCheckApiModule, DrRegexCheckRoutingModule],
  exports: [DrRegexCheckComponent],
})
export class DrRegexCheckModule {}
