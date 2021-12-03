import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegexCheckComponent } from './components/regex-check/regex-check.component';
import { LmDirectivesComponent } from './lm-directives.component';

const routes: Routes = [
  {
    path: '',
    component: LmDirectivesComponent,
    children: [
      { path: 'regex-check', component: RegexCheckComponent },
      { path: '**', redirectTo: 'regex-check' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmDirectivesRoutingModule {}
