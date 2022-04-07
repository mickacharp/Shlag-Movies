import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class CollectionMoviesService {
  myMovies: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  movieToDisplay: Movie = new Movie('', '', 0, '', '', '', '');

  audiences: string[] = ['Alone', 'In couple', 'With family', 'With friends'];
  currentYear: number = new Date().getFullYear();
  synopsisMaxLength: number = 500;

  constructor(private afs: AngularFirestore) {}

  getAllMovies(): Observable<Movie[]> {
    return this.afs
      .collection<Movie>('movies', (ref) => ref.orderBy('title')) // we order the movies by alphabetical titles
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const data = c.payload.doc.data() as Movie;
            const id = c.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getOneMovie(movieTitle: string): Observable<Movie[]> {
    // ref.where allow to search for a particular request (here, we want the movie which its title is movieTitle)
    return this.afs
      .collection<Movie>('movies', (ref) =>
        ref.where('title', '==', movieTitle)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const data = c.payload.doc.data() as Movie;
            const id = c.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getMoviesWithName(movieContains: string): Observable<Movie[]> {
    return this.afs
      .collection<Movie>('movies', (ref) =>
        ref
          .where('title', '>=', movieContains)
          .where('title', '<=', movieContains + '\uf8ff')
      )
      .valueChanges()
      .pipe(map((movie) => movie));
  }

  addMovie(newMovie: Movie): void {
    this.afs
      .collection<Movie>('movies')
      .add(JSON.parse(JSON.stringify(newMovie))); // we need to JSON the file before pushing it to Firebase
  }
  // .add(element) allows to add the element to Firebase with a random ID
  // .doc('id_that_we_want').set adds the element with an id = id_that_we_want

  updateMovie(movieToUpdate: Movie): void {
    this.afs
      .collection<Movie>('movies')
      .doc<Movie>(movieToUpdate.id)
      .set(movieToUpdate);
  }

  deleteMovie(movieToDeleteId: string): void {
    this.afs.collection<Movie>('movies').doc<Movie>(movieToDeleteId).delete();
  }
}
