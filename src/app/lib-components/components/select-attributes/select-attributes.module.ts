import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionGroupModule, GlnOptionModule, GlnSelectModule } from 'gelenium-ui';

import { SelectAttributesComponent } from './select-attributes.component';

@NgModule({
  declarations: [SelectAttributesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnOptionModule,
    GlnSelectModule,
    GlnOptionGroupModule,
  ],
  exports: [SelectAttributesComponent],
})
export class SelectAttributesModule {}
