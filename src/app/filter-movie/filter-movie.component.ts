import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { CollectionMoviesService } from '../shared/collection-movies.service';

@Component({
  selector: 'app-filter-movie',
  templateUrl: './filter-movie.component.html',
  styleUrls: ['./filter-movie.component.scss'],
})
export class FilterMovieComponent implements OnInit {
  moviesList: Movie[] = [];
  audiences: string[] = [];

  constructor(private movieService: CollectionMoviesService) {}

  ngOnInit(): void {
    this.audiences = this.movieService.audiences;
    this.movieService
      .getAllMovies()
      .subscribe((movies) => (this.moviesList = movies));
  }
}
