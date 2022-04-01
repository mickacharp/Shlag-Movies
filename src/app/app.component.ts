import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayModal: boolean = false;

  showModalDialog(): void {
    this.authService.displayModal.next(true);
  }

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.displayModal.subscribe(
      (bool) => (this.displayModal = bool)
    );
  }
}
