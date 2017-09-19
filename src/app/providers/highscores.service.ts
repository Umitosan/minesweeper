import { Injectable } from '@angular/core';
import { Highscore } from '../models/highscore.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class HighscoresService {
  scores: FirebaseListObservable<any[]>;

  constructor(private highscore: Highscore) {

  }

}
