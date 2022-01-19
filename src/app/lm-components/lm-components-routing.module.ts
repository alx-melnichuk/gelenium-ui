import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LmComponentsComponent } from './lm-components.component';
import { FrameInputComponent } from './components/frame-input/frame-input.component';
import { HintOrErrorComponent } from './components/hint-or-error/hint-or-error.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { UrlComponents } from './constants/url-components.constants';

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
      { path: '**', redirectTo: URL_INPUT },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmComponentsRoutingModule {}
