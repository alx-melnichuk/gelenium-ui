import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterConfig } from '../lib-core/config/router-config';

import { LmGuidesRouterMapModule } from './lm-guides-router-map.module';
import { LmGuidesComponent } from './lm-guides.component';

const URL_GUIDES_START = RouterConfig.get('URL_GUIDES_START');
const URL_GUIDES_DESCRIPTION = RouterConfig.get('URL_GUIDES_DESCRIPTION');

const routes: Routes = [
  {
    path: '',
    component: LmGuidesComponent,
    children: [
      {
        path: URL_GUIDES_START,
        loadChildren: () => import('../lib-guides/gd-start/gd-start.module').then((m) => m.GdStartModule),
      },
      {
        path: URL_GUIDES_DESCRIPTION,
        loadChildren: () => import('../lib-guides/gd-description/gd-description.module').then((m) => m.GdDescriptionModule),
      },
      { path: '**', redirectTo: URL_GUIDES_START },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LmGuidesRouterMapModule],
  exports: [RouterModule],
})
export class LmGuidesRoutingModule {}
