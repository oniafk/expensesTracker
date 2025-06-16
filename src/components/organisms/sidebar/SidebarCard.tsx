import styled from "styled-components";
import { v, ButtonSave } from "../../../index";

interface SidebarCardProps {
  isOpen?: boolean;
}

export function SidebarCard({ isOpen = false }: SidebarCardProps) {
  return (
    <Container $isOpen={isOpen}>
      <span className="icon">{<v.iconoayuda />}</span>
      {isOpen && (
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Help center</h3>
          <div className="contentBtn">
            <ButtonSave title="contact" bgColor="#f8f2fd" />
          </div>
        </div>
      )}
    </Container>
  );
}
interface ContainerProps {
  $isOpen: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: ${({ $isOpen }) => ($isOpen ? "1rem" : "0.5rem")};
  text-align: center;
  position: relative;
  transition: all 0.3s ease;

  .icon {
    position: ${({ $isOpen }) => ($isOpen ? "absolute" : "static")};
    font-size: 3rem;
    border-radius: 50%;
    top: ${({ $isOpen }) => ($isOpen ? "-8px" : "auto")};
    right: ${({ $isOpen }) => ($isOpen ? "50%" : "auto")};
    transform: ${({ $isOpen }) => ($isOpen ? "translate(50%)" : "none")};
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cardContent {
    position: relative;
    padding: 1rem;
    background: ${(props) => props.theme.bg5};
    border-radius: 10px;
    overflow: hidden;

    .circle1,
    .circle2 {
      position: absolute;
      background: ${(props) => props.theme.whiteBg};
      border-radius: 50%;
      opacity: 0.7;
    }
    .circle1 {
      height: 100px;
      width: 100px;
      top: -50px;
      left: -50px;
    }
    .circle2 {
      height: 130px;
      width: 130px;
      bottom: -80px;
      right: -70px;
    }
    h3 {
      font-size: 1.1rem;
      margin-top: 1rem;
      padding: 1rem 0;
      font-weight: 800;
      color: #000;
    }
    .contentBtn {
      position: relative;
      margin-left: -8px;
    }
  }
`;
