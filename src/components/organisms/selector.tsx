import styled from "styled-components";
import { v } from "../../index";

// TypeScript interfaces
interface SelectorProps {
  color: string;
  state: boolean;
  onClick: () => void;
  text1: string;
  text2: string;
}

interface ContainerProps {
  $color: string;
}

export function Selector({
  color,
  state,
  onClick,
  text1,
  text2,
}: SelectorProps) {
  return (
    <Container $color={color} onClick={onClick}>
      <div>
        <span>{text1}</span>
        <span>{text2}</span>
      </div>
      <span className={state ? "open" : "close"}>{<v.iconoFlechabajo />}</span>
    </Container>
  );
}
const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  cursor: pointer;
  border: 2px solid ${(props) => props.$color};
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  transition: 0.3s;
  font-weight: 600;

  box-shadow: 4px 9px 20px -12px ${(props) => props.$color};
  .open {
    transition: 0.3s;
    transform: rotate(0deg);
  }
  .close {
    transition: 0.3s;
    transform: rotate(180deg);
  }
  &:hover {
    background-color: ${(props) => props.$color};
    color: #bbbbbb;
  }
`;
