import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export class ScrollAfterRoutingUtil {
  private static pathNameOld = '';
  public static listenForRouterEvents(router: Router): Subscription | null {
    if (!router) {
      return null;
    }
    return router.events.subscribe((value) => {
      const pathName = location.pathname;
      if (value instanceof NavigationStart) {
        ScrollAfterRoutingUtil.pathNameOld = pathName;
      }
      if (value instanceof NavigationEnd && pathName === ScrollAfterRoutingUtil.pathNameOld) {
        const fragmentIdx = value.urlAfterRedirects.lastIndexOf('#');
        if (fragmentIdx >= 0 && fragmentIdx < value.urlAfterRedirects.length - 1) {
          const fragment = value.urlAfterRedirects.substring(fragmentIdx + 1);
          document.getElementById(fragment)?.scrollIntoView();
        }
      }
    });
  }
  public static scrollByFragmentFromPath(): void {
    const pathHash = location.hash;
    if (pathHash && pathHash[0] === '#') {
      const idx = pathHash.indexOf('?');
      const idxEnd = idx > -1 ? idx : pathHash.length;
      const fragment = pathHash.substring(1, idxEnd);
      document.getElementById(fragment)?.scrollIntoView();
    }
  }
}
