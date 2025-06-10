import React from "react";
import styled from "styled-components";
import { Icon } from "../../index";

interface ButtonSaveProps {
  fn?: () => void;
  title?: string;
  bgColor?: string;
  icon?: React.ReactNode;
}

/**
 * Styled component interfaces for type safety
 */
interface StyledButtonProps {
  $bgColor?: string;
}

export const ButtonSave: React.FC<ButtonSaveProps> = ({
  fn,
  title,
  bgColor,
  icon,
}) => {
  return (
    <Container type="submit">
      <Icon className="spanBtn">{icon}</Icon>
      <StyledSpan $bgColor={bgColor} onClick={fn}>
        {title}
      </StyledSpan>
    </Container>
  );
};

/**
 * Container for the button layout
 */
const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  gap: 10px;
  background-color: initial;

  .spanBtn {
    color: white;
    font-size: 20px;
    margin-top: 0.8rem;
  }
`;

/**
 * Styled span with dynamic background color
 * Using $ prefix to indicate transient props (props that shouldn't be passed to DOM)
 */
const StyledSpan = styled.span<StyledButtonProps>`
  background-color: ${({ $bgColor, theme }) => $bgColor || theme.primary};
  font-size: 18px;
  font-weight: 900;
  padding: 0.6em 1.3em;
  border: 3px solid black;
  border-radius: 4px;
  box-shadow: 0.1em 0.1em #000;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: opacity 0.2s ease;
  white-space: 1px;

  &:hover {
    transform: translate(0.05em, 0.05em);
    opacity: 0.9;
  }
  &:active {
    transform: translate(-0.05em, -0.05em);
    opacity: 0.7;
  }
`;
