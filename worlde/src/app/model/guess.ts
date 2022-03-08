import { GuessResult } from "./guess-result";

export interface Guess {
  word: string;
  matches: GuessResult[];
}

export const ALPHABET: string[] =
  ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
export const MAX_NUMBER_OF_GUESSES = 6;
