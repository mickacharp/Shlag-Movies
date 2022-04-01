import { Component, OnInit } from '@angular/core';
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

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.displayModal.subscribe(
      (bool) => (this.displayModal = bool)
    );
  }
}
