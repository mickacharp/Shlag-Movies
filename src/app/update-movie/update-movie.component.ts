import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CollectionMoviesService } from '../shared/collection-movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss'],
})
export class UpdateMovieComponent implements OnInit {
  @Input() movieToDisplay: Movie = new Movie('', '', 0, '', '', '', '');
  synopsisMaxLength: number = 0;
  currentYear: number = 0;
  audiences: string[] = [];

  // Alerts parent MovieDetailsComponent to close Update modal when user confirms changes
  @Output()
  closeUpdateModal: EventEmitter<boolean> = new EventEmitter();
  sendCloseUpdateModal(): void {
    this.closeUpdateModal.emit(false);
  }

  constructor(
    private service: CollectionMoviesService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.audiences = this.service.audiences;
    this.currentYear = this.service.currentYear;
    this.synopsisMaxLength = this.service.synopsisMaxLength;
  }

  updateMovie(): void {
    if (this.movieToDisplay) {
      this.service.updateMovie(this.movieToDisplay);
      this.router.navigate([`/movies/${this.movieToDisplay.title}`]);
    }
  }

  confirmUpdate() {
    this.confirmationService.confirm({
      message: 'Are you sure to update this movie? 🤔',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Movie updated',
          detail: `${this.movieToDisplay.title} got a lifting 😎`,
        });
        this.updateMovie();
        this.sendCloseUpdateModal();
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Movie unchanged',
          detail: 'No worries your changes has been cancelled 😇',
        });
      },
    });
  }
}
