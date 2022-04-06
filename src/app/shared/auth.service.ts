import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Observable<firebase.User | null>;
  displayModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private messageService: MessageService,
    private router: Router
  ) {
    this.userData = afAuth.authState;
  }

  ngOnInit(): void {}

  /* Sign up */
  SignUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed up!', res);
      })
      .catch((err) => {
        console.log('Something is wrong: ', err.message);
      });
  }
  /* Sign in */
  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed in!', res);
        this.displayModal.next(false);
        this.messageService.add({
          severity: 'success',
          summary: 'You are logged in!',
          detail: `Welcome back mah frend`,
        });
      })
      .catch((err) => {
        console.log('Something is wrong: ', err.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Wrong credentials 😕',
          detail: `We don't know this email/password, please check if you didn't make any mistake.`,
        });
      });
  }
  /* Sign out */
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
    this.displayModal.next(false);
    this.messageService.add({
      severity: 'custom',
      summary: 'Adish!',
      detail: `Hope to see you again 😊`,
      icon: 'pi-moon',
    });
  }
}
