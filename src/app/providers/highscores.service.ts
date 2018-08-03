import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class HighscoresService {
  // scores: FirebaseListObservable<any[]>;
  scores: AngularFireList<any[]>;
  afdb: AngularFireDatabase;

  constructor(db: AngularFireDatabase) {
    // this.scores = db.list('highscores').valueChanges();
    this.scores = db.list('highscores');
    console.log(this.scores);
    this.afdb = db;
  }

  getScores() {
    return this.scores.valueChanges();
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
