import { useEffect, useState } from "react";
import * as S from "../../App.styles.js";
import Filters from "../../components/Filters/Filters.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import { LoginSidebar, Sidebar } from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { EmulationApp } from "../../components/EmulationApp/EmulationApp.jsx";
import { getAllTracks } from "../../api.js";
import PropTypes from "prop-types";
import * as St from "../Pages.styles.js";

export const Main = ({ handleLogout }) => {
  const [loading, setLoading] = useState(true); //показ эмуляции загрузки(скелетон)
  const [tracks, setTracks] = useState(true); //показ полученного треклиста из API
  const [tracksError, setTracksError] = useState(true); //ошибка при получении треклиста из API

  const getTracks = () => {
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
  };

  useEffect(() => {
    getTracks();
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
          <Tracklist
            tracks={tracks}
            tracksError={tracksError}
            refetch={getTracks}
          />
        </div>
        <St.ContainerSidebar>
          <LoginSidebar handleLogout={handleLogout} />
          <Sidebar tracks={tracks} handleLogout={handleLogout} />
        </St.ContainerSidebar>
      </S.Main>
    </>
  );
};

Main.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
};
