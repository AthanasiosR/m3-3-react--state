import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import { useState } from "react";
import words from "../data/words.json";
import { colors, contentWidth } from "./GlobalStyles";

const initialGameState = {
  started: false,
  over: false,
  win: false,
  pause: true,
};

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: "" });
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [guessCount, setGuessCount] = useState(0);

  let status = "Start";

  if (game.pause == false) {
    status = "Pause";
  } else if (game.started == true) {
    status = "Continue";
  }

  const handleStart = () => {
    setGame({ ...game, started: true, pause: !game.pause });

    if (word.str === "") {
      let word = getNewWord(words);
    }
  };

  const getNewWord = (words) => {
    let randomI = Math.floor(Math.random() * 870);
    let puzzleWord = words[randomI].split("").map((letter) => (letter = ""));
    setWord({ str: words[randomI], revealed: puzzleWord });
  };

  const handleGuess = (ltr) => {
    let newRevealed = word.revealed.map((letter, i) => {
      return word.str.split("")[i] === ltr && letter === "" ? ltr : letter;
    });

    setGuessCount(guessCount + 1);
    console.log(guessCount);

    setWord({ ...word, revealed: newRevealed });

    if (!wrongGuesses.includes(ltr) && !newRevealed.includes(ltr)) {
      setWrongGuesses([...wrongGuesses, ltr]);
    }

    if (!usedLetters.includes(ltr)) {
      setUsedLetters([...usedLetters, ltr]);
    }
  };

  const handleReset = () => {
    setGame({ ...game, over: false, win: false, pause: false });
    let word = getNewWord(words);
    setUsedLetters([]);
    setWrongGuesses([]);
  };

  const handleEndGame = (win) => {
    setGuessCount(0);
    setGame({ ...game, over: true, win: win ? true : false });
    return alert(`Game Over! You ${win ? "win" : "lose"}`);
  };

  if (guessCount === 10 && word.revealed.includes("")) {
    handleEndGame(false);
  }
  if (!word.revealed.includes("") && guessCount != 0) {
    setGuessCount(0);
    handleEndGame(true);
  }

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{status}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman />
            <RightColumn>
              <DeadLetters usedLetters={wrongGuesses} />
              <TheWord word={word.str} revealed={word.revealed} />
            </RightColumn>
          </Container>
          <Keyboard handleGuess={handleGuess} usedLetters={usedLetters} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;