import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GdDescriptionAboutLibraryModule } from '../gd-description-about-library/gd-description-about-library.module';

import { GdDescriptionComponent } from './gd-description.component';
import { GdDescriptionRoutingModule } from './gd-description-routing.module';

@NgModule({
  declarations: [GdDescriptionComponent],
  imports: [CommonModule, GdDescriptionRoutingModule, GdDescriptionAboutLibraryModule],
  exports: [GdDescriptionComponent],
})
export class GdDescriptionModule {}
