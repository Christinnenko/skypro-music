import * as S from "./NavMenu.styles.js";
import cn from "classnames";
import { useState } from "react";
import PropTypes from "prop-types";

const NavMenu = ({ handleLogout }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);
  const activeClassName = "underline";

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
              <S.Button to="/login" onClick={handleLogout}>
                Выйти
              </S.Button>
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      )}
    </S.MainNav>
  );
};

export default NavMenu;

NavMenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
