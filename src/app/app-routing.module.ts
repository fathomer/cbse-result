import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CbseResultComponent } from './cbse-result/cbse-result.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cbse-result',
    pathMatch: 'full',
  },
  {
    path: "home",
    redirectTo: 'cbse-result',
  },
  {
    path: "cbse-result",
    component: CbseResultComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
