import { useState } from "react";
import * as S from "../../App.styles.js";
import { GlobalStyle } from "../../App.styles.js";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import PropTypes from "prop-types";

export const Main = () => {
  const [showBar, setShowBar] = useState(null);
  const handleTrackPlay = (track) => {
    setShowBar(track);
  };

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
            <Tracklist handleTrackPlay={handleTrackPlay} />
          </div>
          <Sidebar />
        </S.Main>
        {showBar ? (
          <AudioPlayer track={showBar} setShowBar={setShowBar} />
        ) : null}
        <footer></footer>
      </S.Container>
    </S.Wrapper>
  );
};

Main.propTypes = {
  showBar: PropTypes.object,
  track: PropTypes.object,
  setShowBar: PropTypes.func.isRequired,
};
