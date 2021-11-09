import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { LmComponentsRoutingModule } from './lm-components-routing.module';
import { LmComponentsComponent } from './lm-components.component';
import { InputModule } from './components/input/input.module';

@NgModule({
  declarations: [LmComponentsComponent],
  imports: [CommonModule, MatExpansionModule, LmComponentsRoutingModule, InputModule],
})
export class LmComponentsModule {}
