import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionMoviesService } from '../shared/collection-movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {
  newMovie: Movie = new Movie('', '', 0, '', '', '', '');

  constructor(
    private service: CollectionMoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addMovie() {
    this.service.addMovie(this.newMovie);
  }

  navigateToCreatedMovie(): void {
    this.router.navigate([`/movies/${this.newMovie.title}`]);
  }
}
