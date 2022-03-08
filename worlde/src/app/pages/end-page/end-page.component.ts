import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent implements OnInit {

  public headers: Array<string> = [ "Number of tries", "Games" ]

  @Input("guessedTheWord")
  public guessedTheWord: boolean = false;

  public statistics;

  public guessedText: string = "Congratulations! You found the word!";
  public notGuessedText: string = "Better luck next time!";

  constructor(private gameService: GameService) {
    this.guessedTheWord = gameService.isGuessedCompletely();
    this.statistics = gameService.getStatistics();
  }

  ngOnInit(): void {
  }

}
