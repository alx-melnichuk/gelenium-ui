import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexCheckModule } from '../lib-directives/components/regex-check/regex-check.module';
import { RegexMatchModule } from '../lib-directives/components/regex-match/regex-match.module';
import { RegexRemoveModule } from '../lib-directives/components/regex-remove/regex-remove.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RegexCheckModule, RegexMatchModule, RegexRemoveModule],
})
export class LibDirectivesModule {}
