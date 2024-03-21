import { Outlet } from "react-router-dom";
import { GlobalStyle } from "../../App.styles.js";
import * as S from "../../App.styles.js";
import * as Styled from "../Pages.styles.js";
import { useSelector } from "react-redux";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
// import { useViewSelectionsByIdQuery } from "../../services/Services.js";

const PageLayout = () => {
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const { isFavorite } = useSelector((state) => state.player);
  // const { refetch } = useViewSelectionsByIdQuery();

  return (
    <>
      <Styled.Wrapper>
        <GlobalStyle />
        <S.Container>
          <Outlet />
          {currentTrack ? (
            <AudioPlayer
              track={currentTrack}
              // refetch={refetch}
              isFavorite={isFavorite}
            />
          ) : null}
        </S.Container>
      </Styled.Wrapper>
    </>
  );
};

export { PageLayout };
