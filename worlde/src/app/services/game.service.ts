import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MAX_NUMBER_OF_GUESSES} from "../model/guess";
import {GuessResult} from "../model/guess-result";
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private word: string = '';
  private worldList: Array<string> = [];
  private guesses: Array<string> = [];

  constructor(private http: HttpClient) {}

  initWordList() {
    console.log("loading word list");
    return this.http.get<string[]>('/assets/json/world-list.json').pipe(
      tap(result => {
        this.worldList = result;
      })
    );
  }

  startGame() {
    this.word = this.worldList[
      Math.round(Math.random() * this.worldList.length)
      ];
    console.log('Game starting, the word is ' + this.word);
  }

  isInWordList(guessedWord: string): Boolean {
    return this.worldList.indexOf(guessedWord.toLowerCase()) != -1;
  }

  guess(guessedWord: string): GuessResult[] {
    guessedWord = guessedWord.toLowerCase();
    this.guesses.push(guessedWord);
    return this.calculateMatches(guessedWord);
  }

  isFinished(): Boolean {
    return (this.guesses.length != 0 && this.guesses[this.guesses.length - 1] == this.word) ||
      this.guesses.length >= MAX_NUMBER_OF_GUESSES;
  }

  calculateMatches(word: string): GuessResult[] {
    let matches = Array<GuessResult>();
    for (let i = 0; i < 5; i++) {
      let char = word.charAt(i);
      if (this.word.charAt(i) == char) {
        matches.push(GuessResult.GOOD_POSITION);
      } else if (this.word.indexOf(char) != -1) {
        matches.push(GuessResult.WRONG_POSITION);
      } else {
        matches.push(GuessResult.NO_MATCH);
      }
    }
    return matches;
  }

  charResult(char: string): GuessResult {
    let result = GuessResult.NOT_TRIED;
    for (let guess of this.guesses) {
      let guessResult = this.calculateMatches(guess);

      for (let i = 0; i < 5; i++) {
        if (char.toLowerCase() == guess[i]) {
          if (result == GuessResult.NOT_TRIED) {
            result = GuessResult.NO_MATCH;
          }
          if (guessResult[i] == GuessResult.GOOD_POSITION) {
            return GuessResult.GOOD_POSITION;
          } else if (guessResult[i] == GuessResult.WRONG_POSITION) {
            result = GuessResult.WRONG_POSITION
          }
        }
      }
    }

    return result;
  }

}
