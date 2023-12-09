import * as S from "../Pages.styles.js";
import { GlobalStyle } from "../../App.styles.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Button = styled.button`
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

export const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const onSubmit = () => {
    localStorage.setItem("user", JSON.stringify({ login: "edergerg" }));
    setUser({ login: "edergerg" });
    navigate("/");
  };

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <S.Text>Login Page</S.Text>
          <Button onClick={onSubmit}>Войти</Button>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
