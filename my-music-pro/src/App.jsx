import { useState } from "react";
import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";
import { AppRoutes } from "./routes.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <AppRoutes user={user} setUser={setUser} />
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export default App;
