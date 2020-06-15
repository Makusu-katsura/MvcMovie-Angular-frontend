import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesAddEditComponent } from './movies-add-edit/movies-add-edit.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent, pathMatch: 'full' },
  { path: 'Movies/:id', component: MoviesComponent},
  { path: 'add', component: MoviesAddEditComponent },
  { path: 'Movies/Edit/:id', component: MoviesAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
