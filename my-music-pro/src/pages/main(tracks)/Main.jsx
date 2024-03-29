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
import { useDispatch, useSelector } from "react-redux";
import { clearSearchQuery } from "../../store/actions/creators/creators.js";

export const Main = ({ handleLogout }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [tracksError, setTracksError] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);

  const searchQuery = useSelector((state) => state.player.searchQuery);

  const getTracks = async () => {
    try {
      const fetchedTracks = await getAllTracks();
      setTracks(fetchedTracks);
      setLoading(false);
    } catch (error) {
      setTracksError([
        `Не удалось загрузить плейлист, попробуйте позже: ${error.message}`,
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchQuery());
    };
  }, [dispatch]);

  useEffect(() => {
    getTracks();
  }, []);

  useEffect(() => {
    const updatedFilteredTracks = tracks.filter(
      (track) =>
        track.name &&
        track.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Search Query:", searchQuery);
    console.log("Filtered Tracks:", updatedFilteredTracks);
    setFilteredTracks(updatedFilteredTracks);
  }, [searchQuery, tracks]);

  return loading ? (
    <EmulationApp handleLogout={handleLogout} tracks={tracks} />
  ) : (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <div>
          <Search />
          <S.CenterblockH2>Треки</S.CenterblockH2>
          <Filters tracks={tracks} />

          <Tracklist
            tracks={filteredTracks}
            tracksError={tracksError}
            refetch={getTracks}
          />
        </div>
        <St.ContainerSidebar>
          <LoginSidebar handleLogout={handleLogout} />
          <Sidebar handleLogout={handleLogout} />
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
