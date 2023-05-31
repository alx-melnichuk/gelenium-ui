import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouterConfig } from '../lib-core/config/router-config';

import { LmPaletteRouterMapModule } from './lm-palette-router-map.module';
import { LmPaletteComponent } from './lm-palette.component';

const URL_PALETTE_BUTTON = RouterConfig.get('URL_PALETTE_BUTTON');
const URL_PALETTE_CALENDAR = RouterConfig.get('URL_PALETTE_CALENDAR');
const URL_PALETTE_CHECKBOX = RouterConfig.get('URL_PALETTE_CHECKBOX');
const URL_PALETTE_FRAME = RouterConfig.get('URL_PALETTE_FRAME');
const URL_PALETTE_INPUT = RouterConfig.get('URL_PALETTE_INPUT');
const URL_PALETTE_PAGINATION = RouterConfig.get('URL_PALETTE_PAGINATION');
const URL_PALETTE_RADIOBUTTON = RouterConfig.get('URL_PALETTE_RADIOBUTTON');
const URL_PALETTE_SELECT = RouterConfig.get('URL_PALETTE_SELECT');
const URL_PALETTE_SNACKBAR = RouterConfig.get('URL_PALETTE_SNACKBAR');
const URL_PALETTE_TEXTAREA = RouterConfig.get('URL_PALETTE_TEXTAREA');

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
        path: URL_PALETTE_CALENDAR,
        loadChildren: () => import('../lib-palette/pl-calendar/pl-calendar.module').then((m) => m.PlCalendarModule),
      },
      {
        path: URL_PALETTE_CHECKBOX,
        loadChildren: () => import('../lib-palette/pl-checkbox/pl-checkbox.module').then((m) => m.PlCheckboxModule),
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
        path: URL_PALETTE_PAGINATION,
        loadChildren: () => import('../lib-palette/pl-pagination/pl-pagination.module').then((m) => m.PlPaginationModule),
      },
      {
        path: URL_PALETTE_RADIOBUTTON,
        loadChildren: () => import('../lib-palette/pl-radio/pl-radio.module').then((m) => m.PlRadioModule),
      },
      {
        path: URL_PALETTE_SELECT,
        loadChildren: () => import('../lib-palette/pl-select/pl-select.module').then((m) => m.PlSelectModule),
      },
      {
        path: URL_PALETTE_SNACKBAR,
        loadChildren: () => import('../lib-palette/pl-snackbar/pl-snackbar.module').then((m) => m.PlSnackbarModule),
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
