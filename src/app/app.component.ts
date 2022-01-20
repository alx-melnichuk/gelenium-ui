import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
// import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'geranium-demo';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Navigation started.
        console.log(event.url);
      }
    });
    /*this.router.events
      .pipe((e) => e instanceof NavigationStart)
      .subscribe((e) => {
      const navigation = router.getCurrentNavigation();
      console.log('router.events ', navigation);
      // tracingService.trace({id: navigation.extras.state.tracingId});
    });*/
  }
}
