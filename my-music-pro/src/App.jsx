import { useState } from "react";
import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";
import { AppRoutes } from "./routes.jsx";
import { UserContext } from "./Authorization.js";
import { useNavigate } from "react-router-dom";
import { setCurrentTrack } from "./store/actions/creators/todo.js";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [tracks, setTracks] = useState(true); //показ полученного треклиста из API
  const [tracksError, setTracksError] = useState(true); //ошибка при получении треклиста из API

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
              tracks={tracks}
              setTracks={setTracks}
              tracksError={tracksError}
              setTracksError={setTracksError}
            />
          </S.Container>
        </S.Wrapper>
      </UserContext.Provider>
    </>
  );
}

export default App;
