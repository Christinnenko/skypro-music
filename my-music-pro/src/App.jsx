import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";
import { AppRoutes } from "./routes.jsx";

function App() {
  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <AppRoutes user={JSON.parse(localStorage.getItem("user"))} />
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export default App;
