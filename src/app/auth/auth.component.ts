import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  signUp() {
    this.authService.SignUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }
  signIn() {
    this.authService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }
  signOut() {
    this.authService.SignOut();
  }
}
