import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlUtil } from '../lib-core/utils/url.util';

import { LmDirectivesRouterMapModule } from './lm-directives-router-map.module';
import { LmDirectivesComponent } from './lm-directives.component';

const URL_DIRECTIVES_AUTO_FOCUSE = UrlUtil.get('URL_DIRECTIVES_AUTO_FOCUSE');
const URL_DIRECTIVES_REGEX_CHECK = UrlUtil.get('URL_DIRECTIVES_REGEX_CHECK');
const URL_DIRECTIVES_REGEX_MATCH = UrlUtil.get('URL_DIRECTIVES_REGEX_MATCH');
const URL_DIRECTIVES_REGEX_REMOVE = UrlUtil.get('URL_DIRECTIVES_REGEX_REMOVE');

const routes: Routes = [
  {
    path: '',
    component: LmDirectivesComponent,
    children: [
      {
        path: URL_DIRECTIVES_AUTO_FOCUSE,
        loadChildren: () => import('../lib-directives/dr-auto-focuse/dr-auto-focuse.module').then((m) => m.DrAutoFocuseModule),
      },
      {
        path: URL_DIRECTIVES_REGEX_CHECK,
        loadChildren: () => import('../lib-directives/dr-regex-check/dr-regex-check.module').then((m) => m.DrRegexCheckModule),
      },
      {
        path: URL_DIRECTIVES_REGEX_MATCH,
        loadChildren: () => import('../lib-directives/dr-regex-match/dr-regex-match.module').then((m) => m.DrRegexMatchModule),
      },
      {
        path: URL_DIRECTIVES_REGEX_REMOVE,
        loadChildren: () => import('../lib-directives/dr-regex-remove/dr-regex-remove.module').then((m) => m.DrRegexRemoveModule),
      },
      { path: '**', redirectTo: URL_DIRECTIVES_REGEX_CHECK },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LmDirectivesRouterMapModule],
  exports: [RouterModule],
})
export class LmDirectivesRoutingModule {}
