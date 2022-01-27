import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ScrollAfterRoutingUtil } from 'src/app/lib-core/utils/scroll-after-routing.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'geranium-demo';
  private routerEventsSub: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerEventsSub = ScrollAfterRoutingUtil.listenForRouterEvents(this.router);
  }
}
