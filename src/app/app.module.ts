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
// import { masterFirebaseConfig } from './api-keys';
// new firebase related
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Services
import { HighscoresService } from './providers/highscores.service';

// test
import { environment } from '../environments/environment';

console.log("environment.production = ", environment.production);
// export const fbConfig = {};
export const fbConfig = {
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      databaseURL: environment.databaseURL,
      storageBucket: environment.storageBucket
};
// if (environment.production) {
//     fbConfig =  {
//       // apiKey: testKeys.apiKey,
//       // authDomain: testKeys.authDomain,
//       // databaseURL: testKeys.databaseURL,
//       // storageBucket: testKeys.storageBucket
//
//       // apiKey: environment.apiKey,
//       // authDomain: environment.authDomain,
//       // databaseURL: "https://minesweeper-79115.firebaseio.com",
//       // storageBucket: environment.storageBucket
//
//       apiKey: masterFirebaseConfig.apiKey,
//       authDomain: masterFirebaseConfig.authDomain,
//       databaseURL: masterFirebaseConfig.databaseURL,
//       storageBucket: masterFirebaseConfig.storageBucket
//     };
// } else {
//   fbConfig = {
//     apiKey: masterFirebaseConfig.apiKey,
//     authDomain: masterFirebaseConfig.authDomain,
//     databaseURL: masterFirebaseConfig.databaseURL,
//     storageBucket: masterFirebaseConfig.storageBucket
//   };
// }



console.log("fbConfig = ", fbConfig);


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
