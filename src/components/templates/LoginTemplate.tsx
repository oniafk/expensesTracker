import styled from "styled-components";
import { ButtonSave } from "../molecules/ButtonSave";
import { v } from "../../styles/variables";
import { useAuthContext } from "../../context/AuthContextEnhanced";

export function LoginTemplate() {
  const { signInWithGoogle, isLoading } = useAuthContext();

  console.log("🔑 LoginTemplate - Auth state:", { isLoading });

  const handleGoogleSignIn = async () => {
    try {
      console.log("🔑 LoginTemplate - Starting Google sign in...");
      await signInWithGoogle();
      console.log("🔑 LoginTemplate - Google sign in completed");
    } catch (error) {
      console.error("🔑 LoginTemplate - Google sign in error:", error);
    }
  };

  return (
    <Container $imgBackground={v.imagenfondo}>
      <div className="contentCard">
        <span className="version">version 1.0</span>
        <div className="contentCard_image">
          <img src={v.logo} alt="Expenses Tracker Logo" />
        </div>
        <Title>Expenses tracker</Title>
        <p className="slogan">handle your 💰 income and 💸 expenses</p>

        <ContainerBtn>
          <ButtonSave
            fn={handleGoogleSignIn}
            title={isLoading ? "Signing in..." : "Start with Google"}
            icon={<v.iconogoogle />}
            bgColor={v.colorSecundario}
          />
        </ContainerBtn>
      </div>
    </Container>
  );
}

// TypeScript interface for Container props
interface ContainerProps {
  $imgBackground: string;
}

const Container = styled.div<ContainerProps>`
  background-image: url(${({ $imgBackground }) => $imgBackground});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;

  .contentCard {
    background-color: #131313;
    border-radius: 25px;
    gap: 30px;
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);

    .version {
      color: #727272;
      text-align: start;
    }
    .contentCard_image {
      img {
        max-width: 60%;
        animation: float 2s ease-in-out infinite alternate;
      }
    }
    .slogan {
      color: #909090;
      font-size: 1.2rem;
    }
  }

  @keyframes float {
    0% {
      tramsform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate 0, -0px;
    }
  }
`;
const Title = styled.span`
  font-size: 5rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
  display: flex;
  justify-content: center;
`;
