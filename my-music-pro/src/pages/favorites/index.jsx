import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import * as Style from "../Pages.styles.js";
import PropTypes from "prop-types";
import * as S from "../../App.styles.js";
import { LoginSidebar } from "../../components/Sidebar/Sidebar.jsx";
// import Tracklist from "../../components/Tracklist/Tracklist.jsx";
// import { useGetFavTracksQuery } from "../../services/todo";

export const Favorites = ({ handleLogout }) => {
  // const { data, error, isLoading } = useGetFavTracksQuery();

  // const isEmptyList = !isLoading && !data?.length;

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>{error.message}</p>;
  // }

  // if (isEmptyList) {
  //   return <p>No tracks, yay!</p>;
  // }

  return (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <Style.ContainerWrap>
          <Search />
          <S.CenterblockH2>Мои треки</S.CenterblockH2>
          {/* <Tracklist tracks={tracks} tracksError={tracksError} /> */}
        </Style.ContainerWrap>
        <LoginSidebar handleLogout={handleLogout} />
      </S.Main>
    </>
  );
};

Favorites.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
