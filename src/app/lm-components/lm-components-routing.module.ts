import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlUtil } from '../lib-core/utils/url.util';
import { LmComponentsComponent } from './lm-components.component';

const URL_BUTTON = UrlUtil.get('URL_BUTTON');
const URL_FRAME = UrlUtil.get('URL_FRAME');
const URL_HINT_OR_ERROR = UrlUtil.get('URL_HINT_OR_ERROR');
const URL_INFINITE_SCROLL = UrlUtil.get('URL_INFINITE_SCROLL');
const URL_INPUT = UrlUtil.get('URL_INPUT');
const URL_SELECT = UrlUtil.get('URL_SELECT');
const URL_TEXTAREA = UrlUtil.get('URL_TEXTAREA');

const routes: Routes = [
  {
    path: '',
    component: LmComponentsComponent,
    children: [
      {
        path: URL_BUTTON,
        loadChildren: () => import('../lib-components/cm-button/cm-button.module').then((m) => m.CmButtonModule),
      },
      {
        path: URL_FRAME,
        loadChildren: () => import('../lib-components/components/frame/frame.module').then((m) => m.FrameModule),
      },
      {
        path: URL_HINT_OR_ERROR,
        loadChildren: () => import('../lib-components/cm-hint-or-error/cm-hint-or-error.module').then((m) => m.CmHintOrErrorModule),
      },
      {
        path: URL_INFINITE_SCROLL,
        loadChildren: () => import('../lib-components/cm-infinite-scroll/cm-infinite-scroll.module').then((m) => m.CmInfiniteScrollModule),
      },
      {
        path: URL_INPUT,
        loadChildren: () => import('../lib-components/cm-input/cm-input.module').then((m) => m.CmInputModule),
      },
      {
        path: URL_SELECT,
        loadChildren: () => import('../lib-components/components/select/select.module').then((m) => m.SelectModule),
      },
      {
        path: URL_TEXTAREA,
        loadChildren: () => import('../lib-components/components/textarea/textarea.module').then((m) => m.TextareaModule),
      },
      { path: '**', redirectTo: URL_INPUT },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmComponentsRoutingModule {}
