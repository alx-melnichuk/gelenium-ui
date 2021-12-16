import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnRegexCheckDirective } from './grn-regex-check.directive';
import { GrnRegexMatchDirective } from './grn-regex-match.directive';
import { GrnRegexRemoveDirective } from './grn-regex-remove.directive';

@NgModule({
  declarations: [GrnRegexCheckDirective, GrnRegexMatchDirective, GrnRegexRemoveDirective],
  imports: [CommonModule],
  exports: [GrnRegexCheckDirective, GrnRegexMatchDirective, GrnRegexRemoveDirective],
})
export class GrnRegexModule {}
