import * as S from "../Pages.styles.js";
import * as St from "../register/Register.styles.js";
import * as Style from "./NotFound.styles.js";
import Search from "../../components/Search/Search.jsx";
import * as Sty from "../../App.styles.js";
import { LoginSidebar } from "../../components/Sidebar/Sidebar.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import { EmulationAudioPlayer } from "../../components/EmulationApp/EmulationLoading.jsx";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const isOnline = navigator.onLine;

  return (
    <>
      <Sty.Main>
        <NavMenu />
        <div style={{ minWidth: "1070px", justifyContent: "space-between" }}>
          <Search />
          <Style.PageContainer>
            {isOnline ? (
              <>
                <Style.Heading>404</Style.Heading>
                <div style={{ display: "flex" }}>
                  <Style.Text>Страница не найдена</Style.Text>
                  <Style.Image></Style.Image>
                </div>
                <Style.Content>
                  Возможно, она была удалена или перенесена на другой адрес
                </Style.Content>
                <Link to="/">
                  <St.PrimaryButton>Вернуться на главную</St.PrimaryButton>
                </Link>
                <EmulationAudioPlayer></EmulationAudioPlayer>
              </>
            ) : (
              <>
                <Style.ImageSmile></Style.ImageSmile>
                <div style={{ display: "flex" }}>
                  <Style.Text>Ошибка загрузки</Style.Text>
                </div>
                <Style.Content>
                  Проверьте подключение к сети и повторите попытку
                </Style.Content>
                <Link to="/">
                  <St.PrimaryButton>Повторить</St.PrimaryButton>
                </Link>
                <EmulationAudioPlayer></EmulationAudioPlayer>
              </>
            )}
          </Style.PageContainer>
        </div>

        <S.ContainerSidebar>
          <LoginSidebar />
        </S.ContainerSidebar>
      </Sty.Main>
    </>
  );
};
