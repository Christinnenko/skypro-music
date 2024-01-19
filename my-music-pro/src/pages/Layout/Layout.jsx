import { Outlet } from "react-router-dom";
import { GlobalStyle } from "../../App.styles.js";
import * as S from "../../App.styles.js";
import * as Styled from "../Pages.styles.js";
import { useSelector } from "react-redux";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";

const PageLayout = () => {
  const currentTrack = useSelector((state) => state.player.currentTrack);
  return (
    <>
      <Styled.Wrapper>
        <GlobalStyle />
        <S.Container>
          <Outlet />
          {currentTrack ? <AudioPlayer track={currentTrack} /> : null}
        </S.Container>
      </Styled.Wrapper>
    </>
  );
};

export { PageLayout };
