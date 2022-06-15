import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlComponents } from './constants/url-components.constants';
import { LmComponentsComponent } from './lm-components.component';
import { ButtonComponent } from '../lib-components/components/button/button.component';
import { FrameComponent } from '../lib-components/components/frame/frame.component';
import { HintOrErrorComponent } from '../lib-components/components/hint-or-error/hint-or-error.component';
import { InfiniteScrollComponent } from '../lib-components/components/infinite-scroll/infinite-scroll.component';
import { InputComponent } from '../lib-components/components/input/input.component';
import { SelectComponent } from '../lib-components/components/select/select.component';
import { TextareaComponent } from '../lib-components/components/textarea/textarea.component';

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
      { path: URL_BUTTON, component: ButtonComponent },
      { path: URL_FRAME, component: FrameComponent },
      { path: URL_HINT_OR_ERROR, component: HintOrErrorComponent },
      { path: URL_INFINITE_SCROLL, component: InfiniteScrollComponent },
      { path: URL_INPUT, component: InputComponent },
      { path: URL_SELECT, component: SelectComponent },
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
