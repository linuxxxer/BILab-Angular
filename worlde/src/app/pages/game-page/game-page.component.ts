import { Component, HostListener, OnInit } from '@angular/core';
import { ALPHABET, Guess, MAX_NUMBER_OF_GUESSES } from 'src/app/model/guess';
import { GameService } from 'src/app/services/game.service';

@Component({
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  currentGuessNumber: number = 0;
  guesses: Guess[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // Fill the guesses array with empty guesses
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
    if (this.gameService.isFinished()) {
      return;
    }

    const currentWord = this.guesses[this.currentGuessNumber].word;
    const key = event.key;

    if (key == 'Enter' && currentWord.length == 5) {
      if (this.gameService.isInWordList(currentWord)) {
        this.guesses[this.currentGuessNumber].matches = this.gameService.guess(currentWord);
        this.currentGuessNumber++;
      } else {
        alert("Not in the word list!")
      }
    } else if (key == 'Backspace') {
      this.guesses[this.currentGuessNumber].word = currentWord.substring(0, currentWord.length - 1);
    } else if (ALPHABET.indexOf(key.toUpperCase()) != -1 && currentWord.length < 5) {
      this.guesses[this.currentGuessNumber].word += key.toUpperCase();
    }
  }
}
