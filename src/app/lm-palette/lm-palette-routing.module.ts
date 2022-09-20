import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlUtil } from '../lib-core/utils/url.util';

import { LmPaletteRouterMapModule } from './lm-palette-router-map.module';
import { LmPaletteComponent } from './lm-palette.component';

const URL_PALETTE_BUTTON = UrlUtil.get('URL_PALETTE_BUTTON');
const URL_PALETTE_FRAME = UrlUtil.get('URL_PALETTE_FRAME');
const URL_PALETTE_INPUT = UrlUtil.get('URL_PALETTE_INPUT');
const URL_PALETTE_SELECT = UrlUtil.get('URL_PALETTE_SELECT');
const URL_PALETTE_TEXTAREA = UrlUtil.get('URL_PALETTE_TEXTAREA');

const routes: Routes = [
  {
    path: '',
    component: LmPaletteComponent,
    children: [
      {
        path: URL_PALETTE_BUTTON,
        loadChildren: () => import('../lib-palette/pl-button/pl-button.module').then((m) => m.PlButtonModule),
      },
      {
        path: URL_PALETTE_FRAME,
        loadChildren: () => import('../lib-palette/pl-frame/pl-frame.module').then((m) => m.PlFrameModule),
      },
      {
        path: URL_PALETTE_INPUT,
        loadChildren: () => import('../lib-palette/pl-input/pl-input.module').then((m) => m.PlInputModule),
      },
      {
        path: URL_PALETTE_SELECT,
        loadChildren: () => import('../lib-palette/pl-select/pl-select.module').then((m) => m.PlSelectModule),
      },
      {
        path: URL_PALETTE_TEXTAREA,
        loadChildren: () => import('../lib-palette/pl-textarea/pl-textarea.module').then((m) => m.PlTextareaModule),
      },
      { path: '**', redirectTo: URL_PALETTE_INPUT },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LmPaletteRouterMapModule],
  exports: [RouterModule],
})
export class LmPaletteRoutingModule {}
