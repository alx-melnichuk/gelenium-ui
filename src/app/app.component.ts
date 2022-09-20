import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from './lib-core/decorators/auto-unsubscribe';
import { ScrollAfterRoutingUtil } from './lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {
  title = 'gelenium-ui-demo';
  private routerEventsSub: Subscription | null = null;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.routerEventsSub = ScrollAfterRoutingUtil.listenForRouterEvents(this.router);
  }
}
