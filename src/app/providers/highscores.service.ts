import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class HighscoresService {
  scores: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    // this.scores = db.list('highscores').valueChanges();
    this.scores = db.list('highscores');
  }

  getScores() {
    return this.scores.valueChanges();
  }

  // setScore(private name: string, private score: string) {
  //   this.scores.push({name,score});
  // }

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
