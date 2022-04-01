import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CollectionMoviesService } from '../shared/collection-movies.service';
import { Movie } from '../models/movie';
import { filter } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieToDisplay: Movie = new Movie('', '', 0, '', '', '', '');
  displayModal: boolean = false;

  showModalDialog(): void {
    this.displayModal = true;
  }

  constructor(
    private service: CollectionMoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getOneMovie();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getOneMovie();
      });
  }

  getOneMovie(): void {
    const movieTitle = this.route.snapshot.paramMap.get('title') as string;
    this.service.getOneMovie(movieTitle).subscribe((movie) => {
      this.movieToDisplay = movie[0];
    });
  }

  deleteMovie(): void {
    if (this.movieToDisplay.id) {
      this.service.deleteMovie(this.movieToDisplay.id);
      this.router.navigate(['/']);
      this.messageService.add({
        severity: 'success',
        summary: 'Movie deleted',
        detail: `F for mah boi, it will be missed 😭`,
      });
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure to delete this movie? 😱',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Movie deleted',
          detail: `F for mah boi, it will be missed 😭`,
        });
        this.deleteMovie();
      },
    });
  }
}
