import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterConfig } from '../lib-core/config/router-config';

import { LmComponentsRouterMapModule } from './lm-components-router-map.module';
import { LmComponentsComponent } from './lm-components.component';

const URL_COMPONENTS_AUTOCOMPLETE = RouterConfig.get('URL_COMPONENTS_AUTOCOMPLETE');
const URL_COMPONENTS_BUTTON = RouterConfig.get('URL_COMPONENTS_BUTTON');
const URL_COMPONENTS_CHECKBOX = RouterConfig.get('URL_COMPONENTS_CHECKBOX');
const URL_COMPONENTS_CHIP = RouterConfig.get('URL_COMPONENTS_CHIP');
const URL_COMPONENTS_FRAME = RouterConfig.get('URL_COMPONENTS_FRAME');
const URL_COMPONENTS_HINT_OR_ERROR = RouterConfig.get('URL_COMPONENTS_HINT_OR_ERROR');
const URL_COMPONENTS_INFINITE_SCROLL = RouterConfig.get('URL_COMPONENTS_INFINITE_SCROLL');
const URL_COMPONENTS_INPUT = RouterConfig.get('URL_COMPONENTS_INPUT');
const URL_COMPONENTS_PAGINATION = RouterConfig.get('URL_COMPONENTS_PAGINATION');
const URL_COMPONENTS_RADIOBUTTON = RouterConfig.get('URL_COMPONENTS_RADIOBUTTON');
const URL_COMPONENTS_SELECT = RouterConfig.get('URL_COMPONENTS_SELECT');
const URL_COMPONENTS_SNACKBAR = RouterConfig.get('URL_COMPONENTS_SNACKBAR');
const URL_COMPONENTS_SPINNER = RouterConfig.get('URL_COMPONENTS_SPINNER');
const URL_COMPONENTS_SWITCH = RouterConfig.get('URL_COMPONENTS_SWITCH');
const URL_COMPONENTS_TEXTAREA = RouterConfig.get('URL_COMPONENTS_TEXTAREA');
const URL_COMPONENTS_TOOLTIP = RouterConfig.get('URL_COMPONENTS_TOOLTIP');

const routes: Routes = [
  {
    path: '',
    component: LmComponentsComponent,
    children: [
      {
        path: URL_COMPONENTS_AUTOCOMPLETE,
        loadChildren: () => import('../lib-components/cm-autocomplete/cm-autocomplete.module').then((m) => m.CmAutocompleteModule),
      },
      {
        path: URL_COMPONENTS_BUTTON,
        loadChildren: () => import('../lib-components/cm-button/cm-button.module').then((m) => m.CmButtonModule),
      },
      {
        path: URL_COMPONENTS_CHECKBOX,
        loadChildren: () => import('../lib-components/cm-checkbox/cm-checkbox.module').then((m) => m.CmCheckboxModule),
      },
      {
        path: URL_COMPONENTS_CHIP,
        loadChildren: () => import('../lib-components/cm-chip/cm-chip.module').then((m) => m.CmChipModule),
      },
      {
        path: URL_COMPONENTS_FRAME,
        loadChildren: () => import('../lib-components/cm-frame/cm-frame.module').then((m) => m.CmFrameModule),
      },
      {
        path: URL_COMPONENTS_HINT_OR_ERROR,
        loadChildren: () => import('../lib-components/cm-hint-or-error/cm-hint-or-error.module').then((m) => m.CmHintOrErrorModule),
      },
      {
        path: URL_COMPONENTS_INFINITE_SCROLL,
        loadChildren: () => import('../lib-components/cm-infinite-scroll/cm-infinite-scroll.module').then((m) => m.CmInfiniteScrollModule),
      },
      {
        path: URL_COMPONENTS_INPUT,
        loadChildren: () => import('../lib-components/cm-input/cm-input.module').then((m) => m.CmInputModule),
      },
      {
        path: URL_COMPONENTS_PAGINATION,
        loadChildren: () => import('../lib-components/cm-pagination/cm-pagination.module').then((m) => m.CmPaginationModule),
      },
      {
        path: URL_COMPONENTS_RADIOBUTTON,
        loadChildren: () => import('../lib-components/cm-radio/cm-radio.module').then((m) => m.CmRadioModule),
      },
      {
        path: URL_COMPONENTS_SELECT,
        loadChildren: () => import('../lib-components/cm-select/cm-select.module').then((m) => m.CmSelectModule),
      },
      {
        path: URL_COMPONENTS_SNACKBAR,
        loadChildren: () => import('../lib-components/cm-snackbar/cm-snackbar.module').then((m) => m.CmSnackbarModule),
      },
      {
        path: URL_COMPONENTS_SPINNER,
        loadChildren: () => import('../lib-components/cm-spinner/cm-spinner.module').then((m) => m.CmSpinnerModule),
      },
      {
        path: URL_COMPONENTS_SWITCH,
        loadChildren: () => import('../lib-components/cm-switch/cm-switch.module').then((m) => m.CmSwitchModule),
      },
      {
        path: URL_COMPONENTS_TEXTAREA,
        loadChildren: () => import('../lib-components/cm-textarea/cm-textarea.module').then((m) => m.CmTextareaModule),
      },
      {
        path: URL_COMPONENTS_TOOLTIP,
        loadChildren: () => import('../lib-components/cm-tooltip/cm-tooltip.module').then((m) => m.CmTooltipModule),
      },
      { path: '**', redirectTo: URL_COMPONENTS_INPUT },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LmComponentsRouterMapModule],
  exports: [RouterModule],
})
export class LmComponentsRoutingModule {}
