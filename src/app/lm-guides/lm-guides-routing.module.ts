import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlUtil } from '../lib-core/utils/url.util';

import { LmGuidesRouterMapModule } from './lm-guides-router-map.module';
import { LmGuidesComponent } from './lm-guides.component';

const URL_GUIDES_START = UrlUtil.get('URL_GUIDES_START');
const URL_GUIDES_DESCRIPTION = UrlUtil.get('URL_GUIDES_DESCRIPTION');

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
