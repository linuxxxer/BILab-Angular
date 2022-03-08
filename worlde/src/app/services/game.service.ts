import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {MAX_NUMBER_OF_GUESSES} from "../model/guess";
import {GuessResult} from "../model/guess-result";
import {tap} from 'rxjs';
import {formatCurrency} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private word: string = '';
  private worldList: Array<string> = [];
  private guesses: Array<string> = [];
//                              tries:  1  2  3  4  5  6 LOST
  private statistics = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "Lost": 0 };
//                              index:  0  1  2  3  4  5  6
  constructor(private http: HttpClient) {}

  initWordList() {
    console.log("loading word list");
    return this.http.get<string[]>('/assets/json/word-list.json').pipe(
      tap(result => {
        this.worldList = result;
      })
    );
  }

  startGame() {
    this.guesses = [];
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
    let finished = (this.guesses.length != 0 && this.guesses[this.guesses.length - 1] == this.word) ||
      this.guesses.length >= MAX_NUMBER_OF_GUESSES;
    if (finished) {
      let tries = this.guesses.length;
      if (this.guesses[this.guesses.length - 1] == this.word) {
        switch (this.guesses.length) {
          case 1:
            this.statistics["1"]++;
            break;
          case 2:
            this.statistics["2"]++;
            break;
          case 3:
            this.statistics["3"]++;
            break;
          case 4:
            this.statistics["4"]++;
            break;
          case 5:
            this.statistics["5"]++;
            break;
          case 6:
            this.statistics["6"]++;
            break;
        }
      } else {
        this.statistics["Lost"]++;
      }
      console.log(this.statistics);

    }
    return finished;
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

  isGuessedCompletely(): boolean {
    let current = this.guesses[this.guesses.length - 1];
    if (current == this.word) {
      return true;
    }
    return false;
  }

  getStatistics() {
    return this.statistics;
  }

}
