import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGoogleService {
  user$: Observable<User | undefined | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.authService.displayModal.next(false);
    this.messageService.add({
      severity: 'success',
      summary: 'You are logged in!',
      detail: `Welcome back mah frend`,
    });
    if (credential.user != null) {
      return this.updateUserData(credential.user);
    }
  }

  private updateUserData(user: firebase.User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email as string,
      displayName: user.displayName as string,
      photoURL: user.photoURL as string,
    };

    return userRef.set(data, { merge: true });
  }
}
