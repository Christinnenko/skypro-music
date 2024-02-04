import { useContext } from "react";
import { Categories } from "../../constants.js";
import * as Styled from "./Sidebar.styles.js";
import PropTypes from "prop-types";
import { UserContext } from "../../Authorization.js";

export function LoginSidebar({ handleLogout }) {
  const { userData } = useContext(UserContext);

  return (
    <Styled.MainSidebar>
      <Styled.SidebarPersonal>
        <Styled.SidebarPersonalName>
          {userData.username}
        </Styled.SidebarPersonalName>
        <Styled.SidebarIcon onClick={handleLogout}>
          <svg alt="logout">
            <use xlinkHref="/icon/sprite.svg#logout"></use>
          </svg>
        </Styled.SidebarIcon>
      </Styled.SidebarPersonal>
    </Styled.MainSidebar>
  );
}

export function Sidebar() {
  return (
    <Styled.MainSidebar>
      <Styled.SidebarBlock>
        <Styled.SidebarList>
          {Categories.map((category) => {
            return (
              <Styled.SidebarItem key={category.id}>
                <Styled.SidebarLink
                  id={category.id}
                  to={`/category/${category.id}`}
                >
                  <Styled.SidebarImg src={category.img} alt={category.alt} />
                </Styled.SidebarLink>
              </Styled.SidebarItem>
            );
          })}
        </Styled.SidebarList>
      </Styled.SidebarBlock>
    </Styled.MainSidebar>
  );
}

LoginSidebar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
