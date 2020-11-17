import React from "react";
import styled from "styled-components";
import { colors } from "./GlobalStyles";
import letters from "../data/letters.json";

const LetterKey = (props) => {
  // handleGuess

  return letters.map((letter) => {
    let clicked = props.used.includes(letter);
    return (
      <Wrapper
        onClick={() => {
          props.handleGuess(letter);
        }}
        disabled={clicked ? true : false}
      >
        {letter}
      </Wrapper>
    );
  });
};

const Wrapper = styled.button`
  background: ${colors.green};
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 32px;
  transition: all linear 400ms;
  &:hover {
    background: ${colors.fuchsia};
  }
  &:disabled,
  &:hover:disabled {
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default LetterKey;