import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultorSelectComponent } from './consultor-select/consultor-select.component';

const routes: Routes = [
  {
    path: '', component: ConsultorSelectComponent, data: { somedata: 'No data' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
