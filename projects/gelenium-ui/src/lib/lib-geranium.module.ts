import { NgModule } from '@angular/core';
import { LibGeraniumService } from './lib-geranium.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [LibGeraniumService],
})
export class LibGeraniumModule {
  constructor() {
    console.log(`LibGeraniumModule();`);
  }
}
