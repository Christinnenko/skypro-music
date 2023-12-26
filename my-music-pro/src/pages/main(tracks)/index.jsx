import { useEffect, useRef, useState } from "react";
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
  const [showAudioPlayer, setShowAudioPlayer] = useState(null); //показ плеера
  const [loading, setLoading] = useState(true); //показ эмуляции загрузки(скелетон)
  const [tracks, setTracks] = useState(true); //показ полученного треклиста из API
  const [tracksError, setTracksError] = useState(true); //ошибка при получении треклиста из API
  const [isPlaying, setIsPlaying] = useState(false); //воспроизведение трека
  const audioRef = useRef(null);

  const handleStart = () => {
    console.log("handleStart");
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleTrackPlay = (track) => {
    console.log("handleTrackPlay");
    setShowAudioPlayer(track);
  };

  useEffect(() => {
    getAllTracks()
      .then((tracks) => {
        setTracks(tracks);
        setLoading(false);
      })
      .catch((error) => {
        setTracksError(
          `Не удалось загрузить плейлист, попробуйте позже: ${error.message}`
        );
      })
      .finally(() => setLoading(false));
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
          <Sidebar tracks={tracks} />
        </S.Main>
        {showAudioPlayer ? (
          <AudioPlayer
            track={showAudioPlayer}
            handleTrackPlay={handleTrackPlay}
            setShowBar={setShowAudioPlayer}
            setIsPlaying={setIsPlaying}
            handleStart={handleStart}
            handleStop={handleStop}
            isPlaying={isPlaying}
            audioRef={audioRef}
          />
        ) : null}
        <footer></footer>
      </S.Container>
    </S.Wrapper>
  );
};
