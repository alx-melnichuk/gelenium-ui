import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlComponents } from '../lib-components/lib-components.constants';
import { LmComponentsComponent } from './lm-components.component';

const URL_BUTTON = UrlComponents.get('URL_BUTTON');
const URL_FRAME = UrlComponents.get('URL_FRAME');
const URL_HINT_OR_ERROR = UrlComponents.get('URL_HINT_OR_ERROR');
const URL_INFINITE_SCROLL = UrlComponents.get('URL_INFINITE_SCROLL');
const URL_INPUT = UrlComponents.get('URL_INPUT');
const URL_SELECT = UrlComponents.get('URL_SELECT');
const URL_TEXTAREA = UrlComponents.get('URL_TEXTAREA');

const routes: Routes = [
  {
    path: '',
    component: LmComponentsComponent,
    children: [
      {
        path: URL_BUTTON,
        loadChildren: () => import('../lib-components/components/button/button.module').then((m) => m.ButtonModule),
      },
      { path: URL_FRAME, loadChildren: () => import('../lib-components/components/frame/frame.module').then((m) => m.FrameModule) },
      {
        path: URL_HINT_OR_ERROR,
        loadChildren: () => import('../lib-components/components/hint-or-error/hint-or-error.module').then((m) => m.HintOrErrorModule),
      },
      {
        path: URL_INFINITE_SCROLL,
        loadChildren: () =>
          import('../lib-components/components/infinite-scroll/infinite-scroll.module').then((m) => m.InfiniteScrollModule),
      },
      {
        path: URL_INPUT,
        loadChildren: () => import('../lib-components/components/input/input.module').then((m) => m.InputModule),
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
