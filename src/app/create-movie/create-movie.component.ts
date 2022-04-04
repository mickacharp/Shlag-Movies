import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionMoviesService } from '../shared/collection-movies.service';
import { Movie } from '../models/movie';
import { max } from 'rxjs';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {
  newMovie: Movie = new Movie('', '', 0, '', '', '', '');
  currentYear: number = new Date().getFullYear();

  synopsisMaxLength: number = 0;

  audiences: string[] = ['Alone', 'In couple', 'With family', 'With friends'];

  constructor(
    private service: CollectionMoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSynopsisMaxLength();
  }

  getSynopsisMaxLength(): void {
    const synopsis = document.querySelector('#synopsis');
    const maxLengthAttributeValue = synopsis?.getAttribute('maxlength');
    if (maxLengthAttributeValue) {
      this.synopsisMaxLength = Number(maxLengthAttributeValue);
    }
  }

  addMovie() {
    this.service.addMovie(this.newMovie);
  }

  navigateToCreatedMovie(): void {
    this.router.navigate([`/movies/${this.newMovie.title}`]);
  }

  onSubmit() {
    this.addMovie();
    this.navigateToCreatedMovie();
  }
}
