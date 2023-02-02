import React from "react";

import Guess from "../Guess";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants.js";
import { range } from "../../utils";

function GuestResults({ guesses, answer }) {
  // we get the data from guesses array by the num
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((num) => {
        return <Guess answer={answer} key={num} value={guesses[num]} />;
      })}
    </div>
  );
}

export default GuestResults;
