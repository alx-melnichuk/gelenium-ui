import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export class ScrollAfterRoutingUtil {
  private static previousHref = '';
  public static listenForRouterEvents(router: Router): Subscription | null {
    if (!router) {
      return null;
    }
    return router.events.subscribe((value) => {
      if (value instanceof NavigationStart) {
        ScrollAfterRoutingUtil.previousHref = ScrollAfterRoutingUtil.getWithoutFragment(window.location.href);
      }

      if (value instanceof NavigationEnd) {
        const locationHref = ScrollAfterRoutingUtil.getWithoutFragment(window.location.href);
        if (locationHref === ScrollAfterRoutingUtil.previousHref) {
          ScrollAfterRoutingUtil.scrollByFragmentFromPath();
        }
      }
    });
  }
  public static getPathname(): string {
    const hash = window.location.hash;
    return ScrollAfterRoutingUtil.getWithoutFragment('#' == hash[0] ? hash.substring(1) : hash);
  }
  public static getWithoutFragment(value: string): string {
    const fragmentIdx = value.lastIndexOf('#');
    return fragmentIdx > -1 ? value.substring(0, fragmentIdx) : value;
  }
  public static scrollByFragmentFromPath(): void {
    const pathHash = location.hash;
    const fragmentIdx = pathHash.lastIndexOf('#');
    if (fragmentIdx > -1) {
      const fragment = pathHash.substring(fragmentIdx + 1);
      document.getElementById(fragment)?.scrollIntoView();
    }
  }
}
