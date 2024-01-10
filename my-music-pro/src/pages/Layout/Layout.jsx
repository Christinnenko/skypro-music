import { Outlet } from "react-router-dom";
import { GlobalStyle } from "../../App.styles.js";
import * as S from "../../App.styles.js";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import PropTypes from "prop-types";
// import * as Styled from "./Layout.styles.js";
import * as Styled from "../Pages.styles.js";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
// import { ContainerWrap } from "./Layout.styles.js";
// import Sidebar from "../Sidebar/Sidebar.jsx";
// import Tracklist from "../Tracklist/Tracklist.jsx";

const PageLayout = ({ handleLogout, tracks }) => {
  return (
    <Styled.Wrapper>
      <GlobalStyle />
      <Styled.Container>
        <S.Main>
          <NavMenu handleLogout={handleLogout} />
          <div>
            <Search />
            <Outlet />
          </div>
          <Sidebar tracks={tracks} handleLogout={handleLogout} />
        </S.Main>
        <footer></footer>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

PageLayout.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  tracks: PropTypes.any.isRequired,
  // tracksError: PropTypes.any.isRequired,
};

export { PageLayout };
