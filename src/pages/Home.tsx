import styled from "styled-components";

import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { signOut } = useAuth();
  const { user } = useAuth();
  console.log("User in Home:", user);
  return (
    <Container>
      <h1>Home</h1>
      <button onClick={signOut}> Sign out</button>
      {user && (
        <div>
          <p>Welcome, {user.user_metadata.full_name}!</p>
          <p>User email: {user.email}</p>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
`;
