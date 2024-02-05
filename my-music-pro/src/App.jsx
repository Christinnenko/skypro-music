import { useState } from "react";
import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";
import { AppRoutes } from "./routes.jsx";
import { UserContext } from "./Authorization.js";
import { useNavigate } from "react-router-dom";
import {
  clearCurrentTrack,
  setCurrentTrack,
} from "./store/actions/creators/creators.js";
import { useDispatch } from "react-redux";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true); //показ эмуляции загрузки(скелетон)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    dispatch(clearCurrentTrack());
  };

  return (
    <>
      <UserContext.Provider
        value={{ userData: user, changingUserData: setUser }}
      >
        <GlobalStyle />
        <S.Wrapper>
          <S.Container>
            <AppRoutes
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
              setCurrentTrack={setCurrentTrack}
              loading={loading}
              setLoading={setLoading}
            />
          </S.Container>
        </S.Wrapper>
      </UserContext.Provider>
    </>
  );
}

export default App;
