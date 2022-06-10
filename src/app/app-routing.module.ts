import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    loadChildren: () => import('./lm-components/lm-components.module').then((m) => m.LmComponentsModule),
  },
  {
    path: 'directives',
    loadChildren: () => import('./lm-directives/lm-directives.module').then((m) => m.LmDirectivesModule),
  },
  { path: '**', redirectTo: 'components' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      anchorScrolling: 'disabled',
      scrollPositionRestoration: 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
