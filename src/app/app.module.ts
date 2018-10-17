// general angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

// components
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';

// firebase related
import { masterFirebaseConfig } from './api-keys';
// new firebase related
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Services
import { HighscoresService } from './providers/highscores.service';
import { RankPipe } from './rank.pipe';



var fbConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RankPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(fbConfig),
    AngularFireDatabaseModule
  ],
  providers: [HighscoresService],
  bootstrap: [AppComponent]
})

export class AppModule { }
