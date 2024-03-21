import { useEffect } from "react";
import * as S from "../../App.styles.js";
import Filters from "../../components/Filters/Filters.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import { LoginSidebar, Sidebar } from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { EmulationApp } from "../../components/EmulationApp/EmulationApp.jsx";
import PropTypes from "prop-types";
import * as St from "../Pages.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { setPagePlaylist } from "../../store/actions/creators/creators.js";
import { useGetAllTracksQuery } from "../../services/Services.js";

export const Main = ({ handleLogout }) => {
  const { data, isLoading, error, refetch } = useGetAllTracksQuery();
  const dispatch = useDispatch();

  const pagePlaylist = useSelector((state) => state.player.pagePlaylist);

  useEffect(() => {
    if (data) {
      dispatch(setPagePlaylist({ fetchedTracks: data }));
    }
  }, [data]);

  const isActiveAuthor = useSelector(
    (state) => state.player.FilterCriteria.isActiveAuthor
  );
  const isActiveGenre = useSelector(
    (state) => state.player.FilterCriteria.isActiveGenre
  );

  const filteredPlaylist = useSelector(
    (state) => state.player.filteredPlaylist
  );

  const isFilter = isActiveAuthor || isActiveGenre;
  const isSearch = useSelector((state) => state.player.isSearch);
  const isSort = useSelector((state) => state.player.isSort);

  const copySearchedPlaylist = useSelector(
    (state) => state.player.copySearchedPlaylist
  );

  return isLoading ? (
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
                  : copySearchedPlaylist
                : isFilter
                ? filteredPlaylist
                : isSort
                ? filteredPlaylist
                : pagePlaylist
            }
            tracksError={error}
            refetch={refetch}
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
