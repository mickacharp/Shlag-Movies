import { Component, Input, OnInit } from '@angular/core';
import { CollectionMoviesService } from '../shared/collection-movies.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  movieSearched: string = '';

  @Input() // received form parent component 'MoviesComponent'
  numberOfMovies: number = 0;

  constructor(private service: CollectionMoviesService) {}

  ngOnInit(): void {}

  getMoviesWithName(): void {
    // we convert our searched movie 'this is a query' into Title Case 'This Is A Query'
    const titleCaseMovie = this.movieSearched
      .toLowerCase()
      .replace(/\b(\w)/g, (s) => s.toUpperCase());

    this.service.getMoviesWithName(titleCaseMovie).subscribe((movies) => {
      this.service.myMovies.next(movies);
    });
  }
}
