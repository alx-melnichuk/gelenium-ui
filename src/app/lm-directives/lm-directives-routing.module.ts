import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LmDirectivesComponent } from './lm-directives.component';
import { RegexCheckComponent } from './components/regex-check/regex-check.component';
import { RegexMatchComponent } from './components/regex-match/regex-match.component';
import { RegexRemoveComponent } from './components/regex-remove/regex-remove.component';

const routes: Routes = [
  {
    path: '',
    component: LmDirectivesComponent,
    children: [
      { path: 'regex-check', component: RegexCheckComponent },
      { path: 'regex-match', component: RegexMatchComponent },
      { path: 'regex-remove', component: RegexRemoveComponent },
      { path: '**', redirectTo: 'regex-check' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmDirectivesRoutingModule {}
