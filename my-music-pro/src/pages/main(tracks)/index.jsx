import { useEffect, useState } from "react";
import * as S from "../../App.styles.js";
import { GlobalStyle } from "../../App.styles.js";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { EmulationApp } from "../../components/EmulationApp/EmulationApp.jsx";
import { getAllTracks } from "../../api.js";

export const Main = () => {
  const [showBar, setShowBar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState(true);
  const [tracksError, setTracksError] = useState(true);

  const handleTrackPlay = (track) => {
    setShowBar(track);
  };

  useEffect(() => {
    getAllTracks()
      .then((tracks) => {
        setTracks(tracks);
        console.log(tracks);
        setLoading(false);
      })
      .catch((error) => {
        setTracksError(
          `Не удалось загрузить плейлист, попробуйте позже: ${error.message}`
        );
      });
  }, []);

  return loading ? (
    <EmulationApp />
  ) : (
    <S.Wrapper>
      <GlobalStyle />
      <S.Container>
        <S.Main>
          <NavMenu />
          <div>
            <Search />
            <S.CenterblockH2>Треки</S.CenterblockH2>
            <Filters />
            <Tracklist
              handleTrackPlay={handleTrackPlay}
              tracks={tracks}
              tracksError={tracksError}
            />
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
