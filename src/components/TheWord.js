import React from "react";
import styled from "styled-components";

const TheWord = (props) => (
  <Wrapper>
    {props.revealed.map((letter) => {
      return <Span line={ (letter === "") ? true : false }>{letter}</Span>
    })}
  </Wrapper>
);

const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "none")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

export default TheWord;