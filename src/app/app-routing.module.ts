import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Defining a route map for an 'Components' partition.
import { LmComponentsRouterMapModule } from './lm-components/lm-components-router-map.module';
// Defining a route map for an 'Directives' partition.
import { LmDirectivesRouterMapModule } from './lm-directives/lm-directives-router-map.module';
// Defining a route map for an 'Guides' partition.
import { LmGuidesRouterMapModule } from './lm-guides/lm-guides-router-map.module';
// Defining a route map for an 'Palette' partition.
import { LmPaletteRouterMapModule } from './lm-palette/lm-palette-router-map.module';

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
    LmComponentsRouterMapModule,
    LmDirectivesRouterMapModule,
    LmGuidesRouterMapModule,
    LmPaletteRouterMapModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
