import { NgModule } from '@angular/core';

import { GrnRegexCheckDirective } from './grn-regex-check.directive';
import { GrnRegexMatchDirective } from './grn-regex-match.directive';
import { GrnRegexRemoveDirective } from './grn-regex-remove.directive';

@NgModule({
  declarations: [GrnRegexCheckDirective, GrnRegexMatchDirective, GrnRegexRemoveDirective],
  imports: [],
  exports: [GrnRegexCheckDirective, GrnRegexMatchDirective, GrnRegexRemoveDirective],
})
export class LibDirectivesModule {}
