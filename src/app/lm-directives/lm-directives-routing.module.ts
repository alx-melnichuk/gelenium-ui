import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlDirectives } from '../lib-directives/lib-directives.constants';

import { LmDirectivesComponent } from './lm-directives.component';

const URL_AUTO_FOCUSE = UrlDirectives.get('URL_AUTO_FOCUSE');
const URL_REGEX_CHECK = UrlDirectives.get('URL_REGEX_CHECK');
const URL_REGEX_MATCH = UrlDirectives.get('URL_REGEX_MATCH');
const URL_REGEX_REMOVE = UrlDirectives.get('URL_REGEX_REMOVE');

const routes: Routes = [
  {
    path: '',
    component: LmDirectivesComponent,
    children: [
      {
        path: URL_AUTO_FOCUSE,
        loadChildren: () => import('../lib-directives/components/auto-focuse/auto-focuse.module').then((m) => m.AutoFocuseModule),
      },
      {
        path: URL_REGEX_CHECK,
        loadChildren: () => import('../lib-directives/components/regex-check/regex-check.module').then((m) => m.RegexCheckModule),
      },
      {
        path: URL_REGEX_MATCH,
        loadChildren: () => import('../lib-directives/components/regex-match/regex-match.module').then((m) => m.RegexMatchModule),
      },
      {
        path: URL_REGEX_REMOVE,
        loadChildren: () => import('../lib-directives/components/regex-remove/regex-remove.module').then((m) => m.RegexRemoveModule),
      },
      { path: '**', redirectTo: URL_REGEX_CHECK },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmDirectivesRoutingModule {}
