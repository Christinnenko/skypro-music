import AudioPlayer from "./components/AudioPlayer/AudioPlayer.jsx";
import NavMenu from "./components/NavMenu/NavMenu.jsx";
import Tracklist from "./components/Tracklist/Tracklist.jsx";
import Search from "./components/Search/Search.jsx";
import Filters from "./components/Filters/Filters.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";

function App() {
  return (
    <S.Wrapper>
      <GlobalStyle />
      <S.Container>
        <S.Main>
          <NavMenu />
          <div>
            <Search />
            <S.CenterblockH2>Треки</S.CenterblockH2>
            <Filters />
            <Tracklist />
          </div>
          <Sidebar />
        </S.Main>
        <AudioPlayer />
        <footer></footer>
      </S.Container>
    </S.Wrapper>
  );
}

export default App;
