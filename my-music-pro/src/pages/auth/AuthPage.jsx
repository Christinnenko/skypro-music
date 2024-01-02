import { Link, useNavigate } from "react-router-dom";
import * as S from "./AuthPage.styles";
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { loginUser, registerUser } from "../../api";
import { UserContext } from "../../Authorization";

export default function AuthPage({ setIsLoginMode, isLoginMode }) {
  const navigate = useNavigate();
  const { changingUserData } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const authBtnRef = useRef(null);

  const handleLogin = async () => {
    if (!email) {
      setError("Укажите почту");
      return;
    }

    if (!password) {
      setError("Укажите пароль");
      return;
    }

    try {
      setIsRegistering(true);
      const response = await loginUser({ email, password });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        changingUserData(user);
        setIsLoginMode(true);
        navigate("/");
      } else {
        if (response.status === 400) {
          setError("Неверный ввод");
        } else if (response.status === 401) {
          setError("Пользователь с таким email или паролем не найден");
        } else if (response.status === 500) {
          setError("Внутренняя ошибка сервера");
        }
      }
    } catch (error) {
      console.error("Ошибка при входе:", error.message);
      setError("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRegister = async () => {
    if (!email) {
      setError("Укажите почту");
      return;
    }

    if (!password) {
      setError("Укажите пароль");
      return;
    }

    if (!repeatPassword) {
      setError("Укажите повторный пароль");
      return;
    }

    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      setIsRegistering(true);
      const response = await registerUser({ email, password });
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        changingUserData(user);
        setIsLoginMode(true);
      } else {
        if (response.status === 400) {
          setError("Неверный ввод");
        } else if (response.status === 500) {
          setError("Внутренняя ошибка сервера");
        }
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error.message);
      setError(
        "Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isLoginMode, email, password, repeatPassword]);

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/">
          <S.ModalLogo>
            <S.ModalLogoImage src="/img/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </Link>
        {isLoginMode ? (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </S.Inputs>

            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton
                onClick={handleLogin}
                ref={authBtnRef}
                disabled={isRegistering}
              >
                {isRegistering ? "Загрузка..." : "Войти"}
              </S.PrimaryButton>

              <S.SecondaryButton onClick={() => setIsLoginMode(false)}>
                Зарегистрироваться
              </S.SecondaryButton>
            </S.Buttons>
          </>
        ) : (
          <>
            <S.Inputs>
              <S.ModalInput
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <S.ModalInput
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <S.ModalInput
                type="password"
                name="repeat-password"
                placeholder="Повторите пароль"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
              />
            </S.Inputs>
            {error && <S.Error>{error}</S.Error>}
            <S.Buttons>
              <S.PrimaryButton
                onClick={handleRegister}
                ref={authBtnRef}
                disabled={isRegistering}
              >
                {isRegistering ? "Регистрация..." : "Зарегистрироваться"}
              </S.PrimaryButton>
            </S.Buttons>
          </>
        )}
      </S.ModalForm>
    </S.PageContainer>
  );
}

AuthPage.propTypes = {
  isLoginMode: PropTypes.bool.isRequired,
  setIsLoginMode: PropTypes.func.isRequired,
};
