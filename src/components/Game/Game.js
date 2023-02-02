import React from "react";

import { range, sample } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants.js";
import { checkGuess } from "../../game-helpers.js";
import { WORDS } from "../../data";

import { GuestResults } from "./GuestResults.js";
import { GuestInput } from "./GuessInput.js";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [userGuessResults, setUserGuessResults] = React.useState([]);
  const [emptyGuessResults, setGuessResults] = React.useState(
    range(0, NUM_OF_GUESSES_ALLOWED)
  );
  const [guessTaken, setGuessTaken] = React.useState(0);
  const [isWinning, setIsWinning] = React.useState(false);
  const [isLosing, setIsLosing] = React.useState(false);
  const [enableGuess, setEnableGuess] = React.useState(true);

  let notFilledGuessResults = [...emptyGuessResults];

  if (userGuessResults.length > 0) {
    notFilledGuessResults = emptyGuessResults.slice(
      0,
      -userGuessResults.length
    );
  }

  function handleOnSubmit(guess) {
    const userGuess = [...guess];
    const guessResults = checkGuess(answer, guess);

    const finalResults = userGuess.map((letter, index) => {
      return { letter: letter, status: guessResults[index].status };
    });

    const isWinning = finalResults.every((letter) => {
      return letter.status === "correct";
    });

    // push guesses into emptyGuessResults
    const newUserGuessResults = [...userGuessResults];
    newUserGuessResults.push(finalResults);

    setUserGuessResults(newUserGuessResults);

    if (isWinning) {
      setIsWinning(true);
      setEnableGuess(false);
    }

    const newGuessTaken = guessTaken + 1;

    setGuessTaken(newGuessTaken);

    if (isWinning === false && newGuessTaken === NUM_OF_GUESSES_ALLOWED) {
      setIsLosing(true);
      setEnableGuess(false);
    }
  }

  return (
    <div className="game-wrapper">
      <GuestResults
        userGuessResults={userGuessResults}
        notFilledGuessResults={notFilledGuessResults}
      />

      <GuestInput handleOnSubmit={handleOnSubmit} enableGuess={enableGuess} />

      {isWinning && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guessTaken} guesses</strong>.
          </p>
        </div>
      )}

      {isLosing && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default Game;
