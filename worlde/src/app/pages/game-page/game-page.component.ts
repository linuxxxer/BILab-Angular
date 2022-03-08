import {Component, HostListener, OnInit} from '@angular/core';
import {ALPHABET, Guess, MAX_NUMBER_OF_GUESSES} from 'src/app/model/guess';
import {GameService} from 'src/app/services/game.service';
import {GuessResult} from "../../model/guess-result";
import {Router} from "@angular/router";

@Component({
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  currentGuessNumber: number = 0;
  guesses: Guess[] = [];

  constructor(private gameService: GameService,
              private routerService: Router) {}

  ngOnInit(): void {
    // Fill the guesses array with empty guesses
    console.log("currentGuessNumber: " + this.currentGuessNumber);
    for (let i = 0; i < MAX_NUMBER_OF_GUESSES; i++) {
      this.guesses.push({
        word: '',
        matches: [],
      });
    }
    this.gameService.initWordList().subscribe(() => {
      this.gameService.startGame();
    });
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const currentWord = this.guesses[this.currentGuessNumber].word;
    const key = event.key;

    if (key == 'Enter' && currentWord.length == 5) {
      if (this.gameService.isInWordList(currentWord)) {
        this.guesses[this.currentGuessNumber].matches = this.gameService.guess(currentWord);
        this.currentGuessNumber++;
      } else {
        alert("Not in the word list!");
      }
    } else if (key == 'Backspace') {
      this.guesses[this.currentGuessNumber].word = currentWord.substring(0, currentWord.length - 1);
    } else if (ALPHABET.indexOf(key.toUpperCase()) != -1 && currentWord.length < 5) {
      this.guesses[this.currentGuessNumber].word += key.toUpperCase();
    }
    if (this.gameService.isFinished()) {
      console.log("FINISHED");
      this.routerService.navigateByUrl('end');
      return;
    }
  }
}
