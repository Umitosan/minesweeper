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

// test
import { environment } from '../environments/environment';

if (environment) {
  console.log("environment.production = ", environment.production);
} else {
  console.log("environment.production = ", environment.production);
}

// export const fbConfigProd =  {
//   apiKey: environment.apiKey,
//   authDomain: environment.authDomain,
//   databaseURL: environment.databaseURL,
//   storageBucket: environment.storageBucket
// };

export const fbConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
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
