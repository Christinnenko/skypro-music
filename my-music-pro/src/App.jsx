import { useState } from "react";
import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";
import { AppRoutes } from "./routes.jsx";

function App() {
  //Чтобы при перезагрузке страницы нам не пришлось входить еще раз, можем написать функцию, которая получит данные из localStorage.
  //Если там ничего нет, то вернет null. Укажем выполнение функции в useState, чтобы запись происходила сразу же при запуске.
  const getUserFromLS = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return user;
    }
    return null;
  };

  const [user, setUser] = useState(getUserFromLS);

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
