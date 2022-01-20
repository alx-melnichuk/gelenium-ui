import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    loadChildren: () => import('../../../lm-components/lm-components.module').then((m) => m.LmComponentsModule),
  },
  {
    path: 'directives',
    loadChildren: () => import('../../../lm-directives/lm-directives.module').then((m) => m.LmDirectivesModule),
  },
  { path: '**', redirectTo: 'components' },
];
console.log('SiteRoutingModule;');

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
