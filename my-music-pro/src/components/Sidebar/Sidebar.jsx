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
          <Styled.SidebarItem>
            <Styled.SidebarLink href="#">
              <Styled.SidebarImg
                src="./img/playlist01.png"
                alt="day's playlist"
              />
            </Styled.SidebarLink>
          </Styled.SidebarItem>
          <Styled.SidebarItem>
            <Styled.SidebarLink href="#">
              <Styled.SidebarImg
                src="./img/playlist02.png"
                alt="day's playlist"
              />
            </Styled.SidebarLink>
          </Styled.SidebarItem>
          <Styled.SidebarItem>
            <Styled.SidebarLink href="#">
              <Styled.SidebarImg
                src="./img/playlist03.png"
                alt="day's playlist"
              />
            </Styled.SidebarLink>
          </Styled.SidebarItem>
        </Styled.SidebarList>
      </Styled.SidebarBlock>
    </Styled.MainSidebar>
  );
}

export default Sidebar;
