import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CmAutocompleteComponent } from './cm-autocomplete.component';

const routes: Routes = [{ path: '', component: CmAutocompleteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmAutocompleteRoutingModule {}
