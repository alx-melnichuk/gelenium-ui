import { NgModule } from '@angular/core';

import { GrnOnlyByRegexDirective } from './grn-only-by-regex.directive';
import { GrnRegexpCheckDirective } from './grn-regexp-check.directive';

@NgModule({
  declarations: [GrnOnlyByRegexDirective, GrnRegexpCheckDirective],
  imports: [],
  exports: [GrnOnlyByRegexDirective, GrnRegexpCheckDirective],
})
export class LibDirectivesModule {}
