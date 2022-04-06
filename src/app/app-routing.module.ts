import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { FilterMovieComponent } from './filter-movie/filter-movie.component';
import { GuardComponent } from './guard/guard.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:title', component: MovieDetailsComponent },
  { path: 'add', component: CreateMovieComponent, canActivate: [AuthGuard] },
  { path: 'detailed-table-movies', component: FilterMovieComponent },
  { path: 'guard', component: GuardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
