import { Component, OnInit } from '@angular/core';
import { CollectionMoviesService } from '../collection-movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  myMovies: Movie[] = [];

  constructor(private service: CollectionMoviesService) {}

  ngOnInit(): void {
    this.service
      .getAllMovies()
      .subscribe((movies) => this.service.myMovies.next(movies));
    this.service.myMovies.subscribe((movies) => (this.myMovies = movies));
  }
}
