import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {HttpClientModule} from "@angular/common/http";
import { MatchColorPipe } from './pipes/match-color.pipe';
import { LetterComponent } from './components/letter/letter.component';
import { GuessComponent } from './components/guess/guess.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { EndPageComponent } from './pages/end-page/end-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MatchColorPipe,
    LetterComponent,
    GuessComponent,
    KeyboardComponent,
    GamePageComponent,
    EndPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
