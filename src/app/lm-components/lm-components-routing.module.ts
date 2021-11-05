import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LmComponentsComponent } from './lm-components.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';

const routes: Routes = [
  {
    path: '',
    component: LmComponentsComponent,
    children: [
      { path: 'input', component: InputComponent },
      { path: 'select', component: SelectComponent },
      { path: '**', redirectTo: 'input' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LmComponentsRoutingModule {}
