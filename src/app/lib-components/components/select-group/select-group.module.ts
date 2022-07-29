import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionGroupModule, GlnOptionModule, GlnSelectModule } from 'gelenium-ui';

import { SelectGroupComponent } from './select-group.component';

@NgModule({
  declarations: [SelectGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnOptionGroupModule,
    GlnOptionModule,
    GlnSelectModule,
  ],
  exports: [SelectGroupComponent],
})
export class SelectGroupModule {}
