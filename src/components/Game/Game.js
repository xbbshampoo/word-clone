import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants.js";

import GuestInput from "../GuestInput";
import GuestResults from "../GuestResults";
import LostBanner from "../LostBanner";
import WonBanner from "../WonBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);

console.log({ answer });

function Game() {
  const [gameStatus, setGameStatus] = React.useState("running");
  const [guesses, setGuesses] = React.useState([]);

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];

    setGuesses(nextGuesses);

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus("won");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }

  return (
    <>
      <GuestResults guesses={guesses} answer={answer} />

      <GuestInput
        gameStatus={gameStatus}
        handleSubmitGuess={handleSubmitGuess}
      />

      {gameStatus === "won" && <WonBanner numOfGuesses={guesses.length} />}
      {gameStatus === "lost" && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
