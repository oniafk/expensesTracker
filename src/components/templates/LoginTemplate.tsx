import styled from "styled-components";
import { ButtonSave } from "../../index";

export function LoginTemplate() {
  return (
    <Container>
      <div>
        <span>version 1.0</span>
        <div>
          <img src="" alt="" />
        </div>
        <Title>Expenses tracker</Title>
        <p>handle your 💰 income and 💸 expenses</p>
        <ContainerBtn>
          <ButtonSave />
        </ContainerBtn>
      </div>
    </Container>
  );
}
const Container = styled.div``;
const Title = styled.span`
  font-size: 5rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
  display: flex;
  justify-content: center;
`;
