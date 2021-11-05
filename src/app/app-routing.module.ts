import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'components',
    loadChildren: () => import('./lm-components/lm-components.module').then((m) => m.LmComponentsModule),
  },
  { path: '**', redirectTo: 'components' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
