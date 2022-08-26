import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrRegexMatchBasicModule } from '../dr-regex-match-basic/dr-regex-match-basic.module';
import { DrRegexMatchApiModule } from '../dr-regex-match-api/dr-regex-match-api.module';

import { DrRegexMatchComponent } from './dr-regex-match.component';
import { DrRegexMatchRoutingModule } from './dr-regex-match-routing.module';

@NgModule({
  declarations: [DrRegexMatchComponent],
  imports: [CommonModule, DrRegexMatchBasicModule, DrRegexMatchApiModule, DrRegexMatchRoutingModule],
  exports: [DrRegexMatchComponent],
})
export class DrRegexMatchModule {}
