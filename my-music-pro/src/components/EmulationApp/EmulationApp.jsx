import NavMenu from "../NavMenu/NavMenu.jsx";
import Search from "../Search/Search.jsx";
import Filters from "../Filters/Filters.jsx";
import {
  EmulationAudioPlayer,
  EmulationSidebar,
  EmulationTracklist,
} from "./EmulationLoading.jsx";
import * as S from "../../App.styles.js";
import { GlobalStyle } from "../../App.styles.js";

function EmulationApp() {
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
            <EmulationTracklist />
          </div>
          <EmulationSidebar />
        </S.Main>
        <EmulationAudioPlayer />
        <footer></footer>
      </S.Container>
    </S.Wrapper>
  );
}

export { EmulationApp };
