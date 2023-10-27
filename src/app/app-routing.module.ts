import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDogsComponent } from './show-dogs/show-dogs.component';

const routes: Routes = [
  {path: '', redirectTo: '/countries', pathMatch: 'full'},
  {path: 'show-dogs', component: ShowDogsComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
