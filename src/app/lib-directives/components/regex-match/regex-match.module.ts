import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexMatchBasicModule } from '../regex-match-basic/regex-match-basic.module';
import { RegexMatchApiModule } from '../regex-match-api/regex-match-api.module';

import { RegexMatchComponent } from './regex-match.component';
import { RegexMatchRoutingModule } from './regex-match-routing.module';

@NgModule({
  declarations: [RegexMatchComponent],
  imports: [CommonModule, RegexMatchBasicModule, RegexMatchApiModule, RegexMatchRoutingModule],
  exports: [RegexMatchComponent],
})
export class RegexMatchModule {}
