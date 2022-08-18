import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlPalette } from '../lib-palette/lib-palette.constants';

import { LmPaletteComponent } from './lm-palette.component';

const URL_INPUT = UrlPalette.get('URL_INPUT');
const URL_SELECT = UrlPalette.get('URL_SELECT');
const URL_TEXTAREA = UrlPalette.get('URL_TEXTAREA');

const routes: Routes = [
  {
    path: '',
    component: LmPaletteComponent,
    children: [
      {
        path: URL_INPUT,
        loadChildren: () => import('../lib-palette/pl-input/pl-input.module').then((m) => m.PlInputModule),
      },
      {
        path: URL_SELECT,
        loadChildren: () => import('../lib-palette/pl-select/pl-select.module').then((m) => m.PlSelectModule),
      },
      {
        path: URL_TEXTAREA,
        loadChildren: () => import('../lib-palette/pl-textarea/pl-textarea.module').then((m) => m.PlTextareaModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmPaletteRoutingModule {}
