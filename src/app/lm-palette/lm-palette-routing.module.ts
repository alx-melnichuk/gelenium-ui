import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlPalette } from '../lib-palette/lib-palette.constants';

import { LmPaletteComponent } from './lm-palette.component';

const URL_INPUT = UrlPalette.get('URL_INPUT');

const routes: Routes = [
  {
    path: '',
    component: LmPaletteComponent,
    children: [
      {
        path: URL_INPUT,
        loadChildren: () => import('../lib-palette/pl-input/pl-input.module').then((m) => m.PlInputModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmPaletteRoutingModule {}
