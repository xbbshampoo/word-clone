import React from "react";

function GuestInput({ gameStatus, handleSubmitGuess }) {
  const [tentativeGuess, setTentativeGuess] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    handleSubmitGuess(tentativeGuess);

    setTentativeGuess("");
  }

  return (
    <form onSubmit={handleSubmit} className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        required
        minLength={5}
        maxLength={5}
        id="guess-input"
        type="text"
        value={tentativeGuess}
        disabled={gameStatus !== "running"}
        onChange={(event) => {
          const nextGuess = event.target.value.toUpperCase();

          setTentativeGuess(nextGuess);
        }}
      />
    </form>
  );
}

export default GuestInput;
