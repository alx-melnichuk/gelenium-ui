import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlDirectives } from './constants/url-directives.constants';
import { LmDirectivesComponent } from './lm-directives.component';
import { RegexCheckComponent } from '../lib-directives/components/regex-check/regex-check.component';
import { RegexMatchComponent } from '../lib-directives/components/regex-match/regex-match.component';
import { RegexRemoveComponent } from '../lib-directives/components/regex-remove/regex-remove.component';

const URL_REGEX_CHECK = UrlDirectives.get('URL_REGEX_CHECK');
const URL_REGEX_MATCH = UrlDirectives.get('URL_REGEX_MATCH');
const URL_REGEX_REMOVE = UrlDirectives.get('URL_REGEX_REMOVE');

const routes: Routes = [
  {
    path: '',
    component: LmDirectivesComponent,
    children: [
      { path: URL_REGEX_CHECK, component: RegexCheckComponent },
      { path: URL_REGEX_MATCH, component: RegexMatchComponent },
      { path: URL_REGEX_REMOVE, component: RegexRemoveComponent },
      { path: '**', redirectTo: URL_REGEX_CHECK },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmDirectivesRoutingModule {}
