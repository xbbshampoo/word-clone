import React from "react";

import { range } from "../../utils";

export function GuestResults({ userGuessResults, notFilledGuessResults }) {
  return (
    <div className="guess-results">
      {userGuessResults.map((guess, guessIndex) => {
        return (
          <p key={guessIndex} className="guess">
            {guess.map(({ letter, status }, guessAlphabetIndex) => {
              return (
                <span
                  key={`${guessIndex}-${guessAlphabetIndex}`}
                  className={`cell ${status}`}
                >
                  {letter}
                </span>
              );
            })}
          </p>
        );
      })}

      {notFilledGuessResults.map((guess, guessIndex) => {
        return (
          <p key={guessIndex} className="guess">
            {range(0, 5).map((guessAlphabet, guessAlphabetIndex) => {
              return (
                <span
                  key={`${guessIndex}-${guessAlphabetIndex}`}
                  className="cell"
                ></span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
