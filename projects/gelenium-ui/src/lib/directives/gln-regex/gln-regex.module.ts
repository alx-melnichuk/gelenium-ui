import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnRegexCheckDirective } from './gln-regex-check.directive';
import { GlnRegexMatchDirective } from './gln-regex-match.directive';
import { GlnRegexRemoveDirective } from './gln-regex-remove.directive';

@NgModule({
  declarations: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective],
  imports: [CommonModule],
  exports: [GlnRegexCheckDirective, GlnRegexMatchDirective, GlnRegexRemoveDirective],
})
export class GlnRegexModule {}
