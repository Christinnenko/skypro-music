import { useEffect, useState } from "react";
import * as S from "../../App.styles.js";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import { LoginSidebar, Sidebar } from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { EmulationApp } from "../../components/EmulationApp/EmulationApp.jsx";
import { getAllTracks } from "../../api.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import * as St from "../Pages.styles.js";

export const Main = ({ handleLogout }) => {
  const [loading, setLoading] = useState(true); //показ эмуляции загрузки(скелетон)
  const [tracks, setTracks] = useState(true); //показ полученного треклиста из API
  const [tracksError, setTracksError] = useState(true); //ошибка при получении треклиста из API

  const currentTrack = useSelector((state) => state.player.currentTrack);

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
    <EmulationApp handleLogout={handleLogout} />
  ) : (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <div>
          <Search />
          <S.CenterblockH2>Треки</S.CenterblockH2>
          <Filters />
          <Tracklist tracks={tracks} tracksError={tracksError} />
        </div>
        <St.ContainerSidebar>
          <LoginSidebar handleLogout={handleLogout} />
          <Sidebar tracks={tracks} handleLogout={handleLogout} />
        </St.ContainerSidebar>
      </S.Main>
      {currentTrack ? <AudioPlayer track={currentTrack} /> : null}
    </>
  );
};

Main.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired,
  tracksError: PropTypes.array.isRequired,
  setTracks: PropTypes.func.isRequired,
  setTracksError: PropTypes.func.isRequired,
};
