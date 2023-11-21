import { useState } from "react";
import "./NavMenu.css";

//ОСТАВЛЮ ПОКА ЗДЕСЬ, НЕ УВЕРЕНА ЧТО ДЕЛАЮ ПРАВИЛЬНО
// function NavMenu() {
//   return (
//     <nav className="main__nav nav">
//       <div className="nav__logo logo">
//         <img className="logo__image" src="/img/logo.png" alt="logo" />
//       </div>
//       <div className="nav__burger burger">
//         <span className="burger__line"></span>
//         <span className="burger__line"></span>
//         <span className="burger__line"></span>
//       </div>
//       <div className="nav__menu menu">
//         <ul className="menu__list">
//           <li className="menu__item">
//             <a href="#" className="menu__link">
//               Главное
//             </a>
//           </li>
//           <li className="menu__item">
//             <a href="#" className="menu__link">
//               Мой плейлист
//             </a>
//           </li>
//           <li className="menu__item">
//             <a href="../signin.html" className="menu__link">
//               Войти
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

const NavMenu = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  return (
    <nav className="main__nav nav">
      <div className="nav__logo logo">
        <img className="logo__image" src="/img/logo.png" alt="logo" />
      </div>
      <div className="nav__burger burger" onClick={toggleVisibility}>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </div>
      {visible && (
        <div className="nav__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a href="#" className="menu__link">
                Главное
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                Мой плейлист
              </a>
            </li>
            <li className="menu__item">
              <a href="../signin.html" className="menu__link">
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
