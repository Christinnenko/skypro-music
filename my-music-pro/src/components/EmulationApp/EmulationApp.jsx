import NavMenu from "../NavMenu/NavMenu.jsx";
import Search from "../Search/Search.jsx";
import Filters from "../Filters/Filters.jsx";
import {
  EmulationAudioPlayer,
  EmulationSidebar,
  EmulationTracklist,
} from "./EmulationLoading.jsx";
import * as S from "../../App.styles.js";
import PropTypes from "prop-types";

function EmulationApp({ handleLogout, tracks }) {
  return (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <div>
          <Search tracks={tracks} />
          <S.CenterblockH2>Треки</S.CenterblockH2>
          <Filters tracks={tracks} />
          <EmulationTracklist />
        </div>
        <EmulationSidebar />
      </S.Main>
      <EmulationAudioPlayer />
    </>
  );
}

export { EmulationApp };

EmulationApp.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired,
};
