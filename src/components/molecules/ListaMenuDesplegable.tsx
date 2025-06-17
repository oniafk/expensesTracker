import styled from "styled-components";
import { ItemsDesplegable, v } from "../../index";

// TypeScript interfaces
interface MenuItem {
  icono: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  text: string;
  tipo: string;
}

interface ListaMenuDesplegableProps {
  data: MenuItem[];
  top: string;
  funcion: (tipo: string) => void;
}

interface ContainerProps {
  $top: string;
}

export function ListaMenuDesplegable({
  data,
  top,
  funcion,
}: ListaMenuDesplegableProps) {
  return (
    <Container $top={top}>
      {data.map((item, index) => {
        return (
          <ItemsDesplegable
            key={index}
            item={item}
            funcion={() => funcion(item.tipo)}
          />
        );
      })}
    </Container>
  );
}
const Container = styled.div<ContainerProps>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 22px;
  top: ${(props) => props.$top};
  box-shadow: ${() => v.boxshadowGray};
`;
