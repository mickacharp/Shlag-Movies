import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionMoviesService } from '../shared/collection-movies.service';
import { Movie } from '../models/movie';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss'],
})
export class CreateMovieComponent implements OnInit {
  newMovie: Movie = new Movie('', '', 0, '', '', '', '');
  synopsisMaxLength: number = 500;
  currentYear: number = new Date().getFullYear();

  audiences: string[] = [];

  constructor(
    private service: CollectionMoviesService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.audiences = this.service.audiences;
  }

  addMovie(): void {
    this.service.addMovie(this.newMovie);
  }

  navigateToCreatedMovie(): void {
    this.router.navigate([`/movies/${this.newMovie.title}`]);
  }

  onSubmit(): void {
    this.addMovie();
    this.navigateToCreatedMovie();
    this.messageService.add({
      severity: 'success',
      summary: 'Movie created',
      detail: `Your movie has been added to the collection 🧐`,
    });
  }
}
