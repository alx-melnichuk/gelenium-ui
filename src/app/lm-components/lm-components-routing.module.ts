import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlComponents } from './constants/url-components.constants';
import { LmComponentsComponent } from './lm-components.component';
import { FrameInputComponent } from './components/frame-input/frame-input.component';
import { HintOrErrorComponent } from './components/hint-or-error/hint-or-error.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';

const URL_FRAME_INPUT = UrlComponents.get('URL_FRAME_INPUT');
const URL_HINT_OR_ERROR = UrlComponents.get('URL_HINT_OR_ERROR');
const URL_INFINITE_SCROLL = UrlComponents.get('URL_INFINITE_SCROLL');
const URL_INPUT = UrlComponents.get('URL_INPUT');
const URL_TEXTAREA = UrlComponents.get('URL_TEXTAREA');

const routes: Routes = [
  {
    path: '',
    component: LmComponentsComponent,
    children: [
      { path: URL_FRAME_INPUT, component: FrameInputComponent },
      { path: URL_HINT_OR_ERROR, component: HintOrErrorComponent },
      { path: URL_INFINITE_SCROLL, component: InfiniteScrollComponent },
      { path: URL_INPUT, component: InputComponent },
      { path: URL_TEXTAREA, component: TextareaComponent },
      // {
      //   path: URL_FRAME_INPUT,
      //   loadChildren: () => import('./components/frame-input/frame-input.module').then((m) => m.FrameInputModule),
      // },
      // {
      //   path: URL_HINT_OR_ERROR,
      //   loadChildren: () => import('./components/hint-or-error/hint-or-error.module').then((m) => m.HintOrErrorModule),
      // },
      // {
      //   path: URL_INFINITE_SCROLL,
      //   loadChildren: () => import('./components/infinite-scroll/infinite-scroll.module').then((m) => m.InfiniteScrollModule),
      // },
      // {
      //   path: URL_INPUT,
      //   loadChildren: () => import('./components/input/input.module').then((m) => m.InputModule),
      // },
      // {
      //   path: URL_TEXTAREA,
      //   loadChildren: () => import('./components/textarea/textarea.module').then((m) => m.TextareaModule),
      // },
      { path: '**', redirectTo: URL_INPUT },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmComponentsRoutingModule {}
