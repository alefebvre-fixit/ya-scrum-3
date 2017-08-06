import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {MdCardModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdListModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdTooltipModule} from '@angular/material';
import {MdDialogModule} from '@angular/material';
import {MdNativeDateModule} from '@angular/material';
import {CovalentLayoutModule} from '@covalent/core';
import {CovalentMediaModule} from '@covalent/core';




import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserModule } from './user';
import { StoryModule } from './story';
import { SprintModule } from './sprint';

import { StoryService, SprintService, UserService } from './services';

export const firebaseConfig = {
    apiKey: 'AIzaSyBRVBLO8VXkurLDQR1eVcVXOmNXyt8SCoc',
    authDomain: 'ya-scrum.firebaseapp.com',
    databaseURL: 'https://ya-scrum.firebaseio.com',
    storageBucket: 'ya-scrum.appspot.com',
    messagingSenderId: '873493349647'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    BrowserAnimationsModule,
    CommonModule,
    MdCardModule,
    MdMenuModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTooltipModule,
    MdDialogModule,
    MdNativeDateModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    SprintModule,
    StoryModule,
    UserModule,
    RouterModule.forRoot(ROUTES),

  ],
  providers: [UserService, StoryService, SprintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
