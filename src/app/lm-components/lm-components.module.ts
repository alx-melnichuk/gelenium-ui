import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LmComponentsRoutingModule } from './lm-components-routing.module';
import { LmComponentsComponent } from './lm-components.component';
import { InputModule } from './components/input/input.module';

@NgModule({
  declarations: [LmComponentsComponent],
  imports: [CommonModule, LmComponentsRoutingModule, InputModule],
})
export class LmComponentsModule {}
