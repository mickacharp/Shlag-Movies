import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../shared/auth-google.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayModal: boolean = false;

  showModalDialog(): void {
    this.authService.displayModal.next(true);
  }

  constructor(
    public authService: AuthService,
    public authGoogleService: AuthGoogleService
  ) {}

  ngOnInit(): void {
    this.authService.displayModal.subscribe(
      (bool) => (this.displayModal = bool)
    );
  }

  signOut() {
    this.authService.signOut();
  }
}
