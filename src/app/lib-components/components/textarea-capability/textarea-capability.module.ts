import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { GlnTextareaModule } from 'projects/gelenium-ui/src/lib/gln-textarea/gln-textarea.module';

import { TextareaCapabilityComponent } from './textarea-capability.component';

@NgModule({
  declarations: [TextareaCapabilityComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonToggleModule, MatExpansionModule, MatTabsModule, GlnTextareaModule],
  exports: [TextareaCapabilityComponent],
})
export class TextareaCapabilityModule {}
