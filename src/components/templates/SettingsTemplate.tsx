import { useState } from "react";

import styled from "styled-components";
import { Header } from "../organisms/Header";
import { Selector } from "../organisms/selector";

export function SettingsTemplate() {
  // Separate state for Header component (user dropdown menu)
  const [headerMenuState, setHeaderMenuState] = useState(false);

  // Separate state for Selector component (currency selector)
  const [currencySelectorState, setCurrencySelectorState] = useState(false);

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{
            state: headerMenuState,
            setState: () => setHeaderMenuState(!headerMenuState),
          }}
        />
      </header>
      <section className="area1">
        <h1>Settings</h1>
      </section>
      <section className="area2">
        <ContentCard>
          <span>currency: </span>
          <Selector
            color="#000"
            state={currencySelectorState}
            onClick={() => setCurrencySelectorState(!currencySelectorState)}
            text1="USD"
            text2="EUR"
          />
        </ContentCard>
      </section>
      <section className="main"></section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 50px
    "main" auto;

  .header {
    grid-area: header;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
  }
  .main {
    grid-area: main;
    background-color: rgba(179, 46, 241, 0.14);
  }
`;
const ContentCard = styled.div`
  display: flex;
  text-align: start;
  align-items: center;
  gap: 20px;
  position: relative;
  width: 100%;
  justify-content: center;
`;
