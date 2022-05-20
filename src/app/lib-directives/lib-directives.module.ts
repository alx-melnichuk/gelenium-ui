import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoFocuseModule } from './components/auto-focuse/auto-focuse.module';
import { RegexCheckModule } from './components/regex-check/regex-check.module';
import { RegexMatchModule } from './components/regex-match/regex-match.module';
import { RegexRemoveModule } from './components/regex-remove/regex-remove.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AutoFocuseModule, RegexCheckModule, RegexMatchModule, RegexRemoveModule],
})
export class LibDirectivesModule {}
