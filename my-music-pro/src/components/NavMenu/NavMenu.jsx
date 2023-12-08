import * as S from "./NavMenu.styles.js";
import cn from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";

const NavMenu = ({ onAuthButtonClick }) => {
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
              <S.NavLink
                className={({ isActive }) =>
                  cn("App-link", {
                    [activeClassName]: isActive,
                  })
                }
                onClick={onAuthButtonClick}
                to="/login"
              >
                Выйти
              </S.NavLink>
            </S.MenuItem>
          </S.MenuList>
        </S.NavMenu>
      )}
    </S.MainNav>
  );
};

export default NavMenu;

NavMenu.propTypes = {
  user: PropTypes.object,
  onAuthButtonClick: PropTypes.func,
};
