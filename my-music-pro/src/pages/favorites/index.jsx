import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import * as Style from "../Pages.styles.js";
import PropTypes from "prop-types";
import * as S from "../../App.styles.js";
import { LoginSidebar } from "../../components/Sidebar/Sidebar.jsx";
// import Tracklist from "../../components/Tracklist/Tracklist.jsx";

export const Favorites = ({ handleLogout }) => {
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
