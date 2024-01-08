import { Link, useNavigate } from "react-router-dom";
import * as S from "../register/register.styles";
import { useContext, useEffect, useRef, useState } from "react";
import { loginUser } from "../../api";
import { UserContext } from "../../Authorization";

export default function Login() {
  const navigate = useNavigate();

  const { changingUserData } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        navigate("/");
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          let errorMessage = "";

          for (const field in errorData) {
            errorMessage += `${errorData[field].join(", ")}`;
          }
          setError(errorMessage);
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

  useEffect(() => {
    setError(null);
  }, [email, password]);

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/">
          <S.ModalLogo>
            <S.ModalLogoImage src="/img/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </Link>
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

            <S.SecondaryButton as={Link} to="/register">
              Зарегистрироваться
            </S.SecondaryButton>
          </S.Buttons>
        </>
      </S.ModalForm>
    </S.PageContainer>
  );
}
