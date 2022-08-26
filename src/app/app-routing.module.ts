import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'guides',
    loadChildren: () => import('./lm-guides/lm-guides.module').then((m) => m.LmGuidesModule),
  },
  {
    path: 'components',
    loadChildren: () => import('./lm-components/lm-components.module').then((m) => m.LmComponentsModule),
  },
  {
    path: 'directives',
    loadChildren: () => import('./lm-directives/lm-directives.module').then((m) => m.LmDirectivesModule),
  },
  {
    path: 'palette',
    loadChildren: () => import('./lm-palette/lm-palette.module').then((m) => m.LmPaletteModule),
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
