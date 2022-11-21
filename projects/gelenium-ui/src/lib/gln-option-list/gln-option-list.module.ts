import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlnOptionModule } from '../gln-option/gln-option.module';
import { GlnOptionGroupModule } from '../gln-option-group/gln-option-group.module';

import { GlnOptionListComponent } from './gln-option-list.component';
import { GlnOptionListPanelDirective } from './gln-option-list-panel.directive';
import { GlnOptionListScrollDirective } from './gln-option-list-scroll.directive';
import { GlnOptionListTriggerDirective } from './gln-option-list-trigger.directive';

@NgModule({
  declarations: [GlnOptionListComponent, GlnOptionListPanelDirective, GlnOptionListScrollDirective, GlnOptionListTriggerDirective],
  imports: [CommonModule, GlnOptionModule, GlnOptionGroupModule],
  exports: [GlnOptionListComponent, GlnOptionListPanelDirective, GlnOptionListScrollDirective, GlnOptionListTriggerDirective],
})
export class GlnOptionListModule {}
