import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppInitializeService } from './lib-core/services/app-initialize.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const INITIALIZE_AUTHENTICATION_FACTORY = (appInitializeService: AppInitializeService): any => {
  return (): Promise<void> => appInitializeService.initSession();
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [
    AppInitializeService,
    {
      provide: APP_INITIALIZER,
      deps: [AppInitializeService],
      useFactory: INITIALIZE_AUTHENTICATION_FACTORY,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('AppModule();');
  }
}
