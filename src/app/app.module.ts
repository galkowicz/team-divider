import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatInputModule, MatIconModule, MatSlideToggleModule, MatGridListModule, MatCardModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {PlayersComponent} from './players/players.component';
import {TeamsComponent} from './teams/teams.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatGridListModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'team-divider'),
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {
}
