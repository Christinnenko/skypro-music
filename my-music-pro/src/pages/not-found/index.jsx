import * as S from "../Pages.styles.js";
import { GlobalStyle } from "../../App.styles.js";

export const NotFound = () => {
  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <S.Text>Page was not found</S.Text>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
