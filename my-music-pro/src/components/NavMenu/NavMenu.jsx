import { useState } from "react";
import * as S from "./NavMenu.styles.js";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const [visible, setVisible] = useState(false);
  const activeClassName = "underline";
  const toggleVisibility = () => setVisible(!visible);
  const navigate = useNavigate();

  const onClick = () => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  return (
    <S.MainNav>
      <S.NavLogo>
        <S.LogoImage src="/img/logo.png" alt="logo" />
      </S.NavLogo>
      <S.NavBurger onClick={toggleVisibility}>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
        <S.BurgerLine></S.BurgerLine>
      </S.NavBurger>
      {visible && (
        <S.NavMenu>
          <S.MenuList>
            <S.MenuItem>
              <S.NavLink to="/">Главное</S.NavLink>
            </S.MenuItem>
            <S.MenuItem>
              <S.NavLink
                to="/favorites"
                className={({ isActive }) =>
                  cn("App-link", {
                    [activeClassName]: isActive,
                  })
                }
              >
                Мой плейлист
              </S.NavLink>
            </S.MenuItem>
            <S.MenuItem>
              <S.NavLink
                className={({ isActive }) =>
                  cn("App-link", {
                    [activeClassName]: isActive,
                  })
                }
                onClick={onClick}
              >
                {localStorage.getItem("user") ? "Выйти" : "Войти"}
              </S.NavLink>
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      )}
    </S.MainNav>
  );
};

// // Предполагая, что у вас есть данные пользователя (например, после успешной аутентификации)
// const user = {
//   username: "exampleUser",
//   // другие свойства пользователя
// };

// // Сохранение пользователя в локальном хранилище
// localStorage.setItem("user", JSON.stringify(user));

export default NavMenu;
