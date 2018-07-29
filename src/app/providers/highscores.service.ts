import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class HighscoresService {
  scores: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.scores = db.list('highscores').valueChanges();
  }

  getScores() {
    return this.scores;
  }

}



// old firebase
// import { Injectable } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//
// @Injectable()
// export class HighscoresService {
//   scores: FirebaseListObservable<any[]>;
//
//   constructor(private db: AngularFireDatabase) {
//     this.scores = db.list('highscores');
//   }
//
//   getScores() {
//     return this.scores;
//   }
//
// }
