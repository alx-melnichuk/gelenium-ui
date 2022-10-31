import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';

import { GlnOptionListComponent } from './gln-option-list.component';
import { GlnOptionListTriggerDirective } from './gln-option-list-trigger.directive';
import { GlnOptionListScrollDirective } from './gln-option-list-scroll.directive';

@NgModule({
  declarations: [GlnOptionListComponent, GlnOptionListTriggerDirective, GlnOptionListScrollDirective],
  imports: [CommonModule, GlnOptionModule, GlnOptionGroupModule],
  exports: [GlnOptionListComponent, GlnOptionListTriggerDirective, GlnOptionListScrollDirective],
})
export class GlnOptionListModule {}
