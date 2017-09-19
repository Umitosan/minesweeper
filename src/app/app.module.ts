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
import { masterFBConifg } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Services
import { HighscoresService } from './providers/highscores.service'

export const fbConfig = {
  apiKey: masterFBConifg.apiKey,
  authDomain: masterFBConifg.authDomain,
  databaseURL: masterFBConifg.databaseURL,
  storageBucket: masterFBConifg.storageBucket
};


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
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
