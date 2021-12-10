import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexRemoveBasicModule } from '../regex-remove-basic/regex-remove-basic.module';
import { RegexRemoveApiModule } from '../regex-remove-api/regex-remove-api.module';

import { RegexRemoveComponent } from './regex-remove.component';

@NgModule({
  declarations: [RegexRemoveComponent],
  imports: [CommonModule, RegexRemoveBasicModule, RegexRemoveApiModule],
  exports: [RegexRemoveComponent],
})
export class RegexRemoveModule {}
