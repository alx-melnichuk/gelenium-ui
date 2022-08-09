import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlComponents } from './constants/url-components.constants';
import { LmComponentsComponent } from './lm-components.component';
import { Button1Component } from '../lib-components/components/button1/button1.component';
import { Button2Component } from '../lib-components/components/button2/button2.component';
import { Frame1Component } from '../lib-components/components/frame1/frame1.component';
import { Frame2Component } from '../lib-components/components/frame2/frame2.component';
import { HintOrErrorComponent } from '../lib-components/components/hint-or-error/hint-or-error.component';
import { InfiniteScrollComponent } from '../lib-components/components/infinite-scroll/infinite-scroll.component';
import { InputComponent } from '../lib-components/components/input/input.component';
import { SelectComponent } from '../lib-components/components/select/select.component';
import { TextareaComponent } from '../lib-components/components/textarea/textarea.component';

const URL_BUTTON1 = UrlComponents.get('URL_BUTTON1');
const URL_BUTTON2 = UrlComponents.get('URL_BUTTON2');
const URL_FRAME1 = UrlComponents.get('URL_FRAME1');
const URL_FRAME2 = UrlComponents.get('URL_FRAME2');
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
      { path: URL_BUTTON1, component: Button1Component },
      { path: URL_BUTTON2, component: Button2Component },
      { path: URL_FRAME1, component: Frame1Component },
      { path: URL_FRAME2, component: Frame2Component },
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
