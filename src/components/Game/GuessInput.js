import React from "react";

export function GuestInput({ handleOnSubmit, enableGuess }) {
  const [input, setInput] = React.useState({ guess: "" });

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();

        handleOnSubmit(input.guess);

        // reset the input field
        const newInput = {
          ...input,
          guess: "",
        };

        setInput(newInput);
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={input.guess}
        minLength="5"
        maxLength="5"
        disabled={!enableGuess}
        onChange={(event) => {
          const newInput = {
            ...input,
            guess: event.target.value.toUpperCase(),
          };

          setInput(newInput);
        }}
      />
    </form>
  );
}
