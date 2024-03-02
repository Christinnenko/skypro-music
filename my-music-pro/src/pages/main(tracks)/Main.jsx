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
import { setPagePlaylist } from "../../store/actions/creators/creators.js";

export const Main = ({ handleLogout }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [tracksError, setTracksError] = useState([]);

  const pagePlaylist = useSelector((state) => state.player.pagePlaylist);

  const getTracks = async () => {
    try {
      const fetchedTracks = await getAllTracks();
      console.log(fetchedTracks);
      console.log(pagePlaylist);
      dispatch(setPagePlaylist({ fetchedTracks }));
      setLoading(false);
    } catch (error) {
      setTracksError([
        `Не удалось загрузить плейлист, попробуйте позже: ${error.message}`,
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTracks();
  }, []);

  const isActiveAuthor = useSelector(
    (state) => state.player.FilterCriteria.isActiveAuthor
  );
  const isActiveGenre = useSelector(
    (state) => state.player.FilterCriteria.isActiveGenre
  );

  const filteredPlaylist = useSelector(
    (state) => state.player.filteredPlaylist
  );
  const searchedPlaylist = useSelector(
    (state) => state.player.searchedPlaylist
  );

  const isFilter = isActiveAuthor || isActiveGenre;
  const isSearch = useSelector((state) => state.player.isSearch);
  const isSort = useSelector((state) => state.player.isSort);

  return loading ? (
    <EmulationApp handleLogout={handleLogout} tracks={pagePlaylist} />
  ) : (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <div>
          <Search tracks={pagePlaylist} />
          <S.CenterblockH2>Треки</S.CenterblockH2>
          <Filters tracks={pagePlaylist} />

          <Tracklist
            tracks={
              isSearch
                ? isFilter
                  ? filteredPlaylist
                  : isSort
                  ? filteredPlaylist
                  : searchedPlaylist
                : isFilter
                ? filteredPlaylist
                : isSort
                ? filteredPlaylist
                : pagePlaylist
            }
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
