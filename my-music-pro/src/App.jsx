import { useEffect, useState } from "react";
import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";
import { AppRoutes } from "./routes.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // При монтировании компонента проверяем наличие пользователя в Local Storage
    const storedUser = localStorage.getItem("user", "sdvcdfv"); //для тестирования авторизованного пользователя добавить сюда ключ ("user")
    if (storedUser) {
      // Если пользователь найден в Local Storage, устанавливаем его в состояние
      setUser(JSON.parse(storedUser));
    } else {
      // Если пользователь не найден в Local Storage, перенаправляем на страницу входа
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <AppRoutes user={user} />
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export default App;
