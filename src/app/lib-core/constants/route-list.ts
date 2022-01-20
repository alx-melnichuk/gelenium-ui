import { Route } from '@angular/router';

export class RouteList {
  private static routes: Route[] = [];
  public static getRoutes(): Route[] {
    return RouteList.routes;
  }
  public static add(route: Route): void {
    if (route && !RouteList.routes.includes(route)) {
      RouteList.routes.push(route);
    }
  }
  public static remove(route: Route): void {
    const index = route ? RouteList.routes.indexOf(route) : -1;
    if (index > -1) {
      RouteList.routes.splice(index, 1);
    }
  }
}
