import styled from "styled-components";

import { v } from "../../../index";

export function Sidebar() {
  return (
    <Main>
      <Container>
        <div className="sidebar__logo">
          <div className="sidebar__logo-img">
            <img src={v.logo} alt="" />
          </div>
        </div>
        <h2>Expenses</h2>
      </Container>
    </Main>
  );
}
const Container = styled.div`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  position: fixed;
  padding: 20px;
  z-index: 100;
  height: 100%;
`;

const Main = styled.main``;
