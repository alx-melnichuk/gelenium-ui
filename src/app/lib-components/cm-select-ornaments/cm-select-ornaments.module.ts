import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnOptionModule, GlnSelectModule, GlnOrnamentModule } from 'gelenium-ui';

import { CmSelectOrnamentsComponent } from './cm-select-ornaments.component';

@NgModule({
  declarations: [CmSelectOrnamentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    GlnOptionModule,
    GlnSelectModule,
    GlnOrnamentModule,
  ],
  exports: [CmSelectOrnamentsComponent],
})
export class CmSelectOrnamentsModule {}
