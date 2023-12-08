import * as S from "../Pages.styles.js";
import { GlobalStyle } from "../../App.styles.js";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <S.Text>Login Page</S.Text>
          <Link to="/">Войти</Link>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
