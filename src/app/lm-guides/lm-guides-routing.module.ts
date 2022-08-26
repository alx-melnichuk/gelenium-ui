import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlUtil } from '../lib-core/utils/url.util';

import { LmGuidesComponent } from './lm-guides.component';

const URL_START = UrlUtil.get('URL_START');
const URL_DESCRIPTION = UrlUtil.get('URL_DESCRIPTION');

const routes: Routes = [
  {
    path: '',
    component: LmGuidesComponent,
    children: [
      {
        path: URL_START,
        loadChildren: () => import('../lib-guides/gd-start/gd-start.module').then((m) => m.GdStartModule),
      },
      {
        path: URL_DESCRIPTION,
        loadChildren: () => import('../lib-guides/gd-description/gd-description.module').then((m) => m.GdDescriptionModule),
      },
      { path: '**', redirectTo: URL_START },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmGuidesRoutingModule {}
