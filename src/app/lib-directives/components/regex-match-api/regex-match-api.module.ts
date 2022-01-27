import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexMatchApiComponent } from './regex-match-api.component';

@NgModule({
  declarations: [RegexMatchApiComponent],
  imports: [CommonModule],
  exports: [RegexMatchApiComponent],
})
export class RegexMatchApiModule {}
