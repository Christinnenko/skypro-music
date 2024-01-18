import { Outlet } from "react-router-dom";
import { GlobalStyle } from "../../App.styles.js";
import * as S from "../../App.styles.js";
import * as Styled from "../Pages.styles.js";

const PageLayout = () => {
  return (
    <>
      <Styled.Wrapper>
        <GlobalStyle />
        <S.Container>
          <Outlet />
        </S.Container>
      </Styled.Wrapper>
    </>
  );
};

export { PageLayout };
