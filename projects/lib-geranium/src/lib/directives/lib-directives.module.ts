import { NgModule } from '@angular/core';

import { GrnOnlyByRegexDirective } from './grn-only-by-regex.directive';
import { GrnRegexpCheckDirective } from './grn-regexp-check.directive';
import { GrnRegexMatchDirective } from './grn-regex-match.directive';
import { GrnRegexRemoveDirective } from './grn-regex-remove.directive';

@NgModule({
  declarations: [GrnOnlyByRegexDirective, GrnRegexpCheckDirective, GrnRegexMatchDirective, GrnRegexRemoveDirective],
  imports: [],
  exports: [GrnOnlyByRegexDirective, GrnRegexpCheckDirective, GrnRegexMatchDirective, GrnRegexRemoveDirective],
})
export class LibDirectivesModule {}
