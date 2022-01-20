import { Injectable } from '@angular/core';
import { Route, Router, RouterModule, Routes } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppInitializeService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private router: Router) {}
  public initSession(): Promise<void> {
    // Get access rights to dynamic modules.
    console.log('Get access rights to dynamic modules.');
    // const routes: Routes = [
    //   {
    //     path: 'component2',
    //     loadChildren: () => import('../../lm-components/lm-components.module').then((m) => m.LmComponentsModule),
    //   },
    // ];
    // RouterModule.forRoot(routes, { enableTracing: false });
    const route: Route = {
      path: 'component2',
      loadChildren: () => import('../../lm-components/lm-components.module').then((m) => m.LmComponentsModule),
    };
    const routes: Routes = this.router.config;
    this.addRoute(routes, route);
    return Promise.resolve();
  }
  private addRoute(routes: Route[], route: Route): void {
    if (routes && route && !routes.find((item) => item.path === route.path)) {
      const len = routes.length;
      const idx = routes.findIndex((item) => item.path === '**');
      const index = idx > -1 ? idx : len;
      routes.splice(index, 0, route);
    }
  }
}
