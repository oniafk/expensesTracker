import styled from "styled-components";
import { SettingsTemplate } from "../components/templates/SettingsTemplate";
export function Settings() {
  return (
    <Container>
      <SettingsTemplate />
    </Container>
  );
}
const Container = styled.main`
  height: 100vh;
`;
