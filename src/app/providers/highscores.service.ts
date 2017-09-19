import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class HighscoresService {
  scores: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.scores = db.list('highscores');
  }

  getScores() {
    return this.scores;
  }

}
