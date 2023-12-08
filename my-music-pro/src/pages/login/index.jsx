import * as S from "../Pages.styles.js";
import { GlobalStyle } from "../../App.styles.js";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavLink = styled(Link)`
  width: 278px;
  height: 52px;
  background-color: #580ea2;
  border-radius: 6px;
  margin-top: 60px;
  margin-bottom: 20px;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  & {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  &:active {
    background-color: #271a58;
  }
  &:hover {
    background-color: #3f007d;
  }
`;

export const Login = () => {
  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <S.Text>Login Page</S.Text>
          <NavLink to="/">Войти</NavLink>
        </S.Container>
      </S.Wrapper>
    </>
  );
};
