import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class HighscoresService {
  // scores: FirebaseListObservable<any[]>;
  scoresListRef: AngularFireList<any>;
  afdb: AngularFireDatabase;

  constructor(db: AngularFireDatabase) {
    this.scoresListRef = db.list('highscores');
    this.afdb = db;
    // db.list('highscores').auditTrail().subscribe(console.log)
  }

  getScores() {
    return this.scoresListRef.valueChanges();
  }

  saveScore(newName: string, newScore: number) {
    this.scoresListRef.push({name: newName, score: newScore});
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
