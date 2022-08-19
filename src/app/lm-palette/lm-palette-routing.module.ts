import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlUtil } from '../lib-core/utils/url.util';

import { LmPaletteComponent } from './lm-palette.component';

const URL_FRAME = UrlUtil.get('URL_FRAME');
const URL_INPUT = UrlUtil.get('URL_INPUT');
const URL_SELECT = UrlUtil.get('URL_SELECT');
const URL_TEXTAREA = UrlUtil.get('URL_TEXTAREA');

const routes: Routes = [
  {
    path: '',
    component: LmPaletteComponent,
    children: [
      {
        path: URL_FRAME,
        loadChildren: () => import('../lib-palette/pl-frame/pl-frame.module').then((m) => m.PlFrameModule),
      },
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
      { path: '**', redirectTo: URL_INPUT },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmPaletteRoutingModule {}
