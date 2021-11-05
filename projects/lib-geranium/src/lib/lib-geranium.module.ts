import { NgModule } from '@angular/core';

import { LibDirectivesModule } from './directives/lib-directives.module';
import { GrnInputModule } from './grn-input/grn-input.module';


@NgModule({
  declarations: [
  ],
  imports: [
    LibDirectivesModule,
    GrnInputModule,
  ],
  exports: [
  ]
})
export class LibGeraniumModule { }
