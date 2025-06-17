import styled from "styled-components";
import { Icon } from "../../index";

// TypeScript interfaces
interface MenuItem {
  icono: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  text: string;
  tipo?: string;
}

interface ItemsDesplegableProps {
  item: MenuItem;
  funcion: () => void;
}

export function ItemsDesplegable({ item, funcion }: ItemsDesplegableProps) {
  return (
    <Container onClick={funcion}>
      <Icon>{item.icono}</Icon>
      <span>{item.text}</span>
    </Container>
  );
}
const Container = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
  }
  svg {
    font-size: 28px;
    display: block;
  }
`;
