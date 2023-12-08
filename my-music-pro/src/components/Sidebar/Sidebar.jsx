import { Categories } from "../../constants.js";
import * as Styled from "./Sidebar.styles.js";

function Sidebar() {
  return (
    <Styled.MainSidebar>
      <Styled.SidebarPersonal>
        <Styled.SidebarPersonalName>Sergey.Ivanov</Styled.SidebarPersonalName>
        <Styled.SidebarIcon>
          <svg alt="logout">
            <use xlinkHref="/icon/sprite.svg#logout"></use>
          </svg>
        </Styled.SidebarIcon>
      </Styled.SidebarPersonal>
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

export default Sidebar;
