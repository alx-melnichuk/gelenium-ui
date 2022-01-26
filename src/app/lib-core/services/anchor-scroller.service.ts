import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouterEvent } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
// import { filter, observeOn, scan } from "rxjs/operators";

import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';

@Injectable({
  providedIn: 'root',
})
@AutoUnsubscribe()
export class AnchorScrollerService {
  private routerEventsSub: Subscription | null = null;
  private pathNameOld = '';

  constructor(private router: Router) {}

  public listenForRouterEvents(): void {
    this.routerEventsSub = this.router.events.subscribe((value) => {
      const pathName = location.pathname;
      if (value instanceof NavigationStart) {
        this.pathNameOld = pathName;
      }
      if (value instanceof NavigationEnd && pathName === this.pathNameOld) {
        const fragmentIdx = value.urlAfterRedirects.lastIndexOf('#');
        if (fragmentIdx >= 0 && fragmentIdx < value.urlAfterRedirects.length - 1) {
          const fragment = value.urlAfterRedirects.substring(fragmentIdx + 1);
          document.getElementById(fragment)?.scrollIntoView();
        }
      }
    });
  }

  public scrollByFragmentFromPath(): void {
    const pathHash = location.hash;
    if (pathHash && pathHash[0] === '#') {
      const fragment = pathHash.substring(1);
      document.getElementById(fragment)?.scrollIntoView();
    }
  }
}
