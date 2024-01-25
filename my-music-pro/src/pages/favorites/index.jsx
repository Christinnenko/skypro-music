import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import * as Style from "../Pages.styles.js";
import PropTypes from "prop-types";
import * as S from "../../App.styles.js";
import { LoginSidebar } from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { useGetFavTracksQuery } from "../../services/todo.js";
import { useEffect } from "react";
import { refreshTokenUser } from "../../api.js";
import { useSelector } from "react-redux";

// const mockFavoritesTracks = [
//   {
//     id: 8,
//     name: "Chase1",
//     author: "test1",
//     release_date: "2005-06-11",
//     genre: "Классическая музыка",
//     duration_in_seconds: 205,
//     album: "Chase1",
//     logo: null,
//     track_file:
//       "https://skypro-music-api.skyeng.tech/media/music_files/Alexander_Nakarada_-_Chase.mp3",
//     stared_user: [],
//   },
//   {
//     id: 9,
//     name: "Chase2",
//     author: "test2",
//     release_date: "2005-06-11",
//     genre: "Классическая музыка",
//     duration_in_seconds: 165,
//     album: "Chase2",
//     logo: null,
//     track_file:
//       "https://skypro-music-api.skyeng.tech/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3",
//     stared_user: [],
//   },
//   {
//     id: 10,
//     name: "Chase3",
//     author: "test3",
//     release_date: "2005-06-11",
//     genre: "Классическая музыка",
//     duration_in_seconds: 305,
//     album: "Chase3",
//     logo: null,
//     track_file:
//       "https://skypro-music-api.skyeng.tech/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3",
//     stared_user: [],
//   },
// ];

export const Favorites = ({ handleLogout }) => {
  const token = JSON.parse(localStorage.access);
  const refreshToken = JSON.parse(localStorage.refresh);

  // const { favTrackIds } = useSelector((state) => state.player);
  const favoriteTracks = useSelector((state) => state.player.favTrackIds);

  const { data, isLoading, error, refetch } = useGetFavTracksQuery({ token });

  useEffect(() => {
    console.log(error, "error");
    if (error && error.status === 401) {
      refreshTokenUser(refreshToken)
        .then((res) => {
          console.log("Обновленный токен:", res);
          localStorage.setItem("access", JSON.stringify(res.access));
        })
        .then(() => {
          refetch();
        })
        .catch((refreshError) => {
          console.error("Ошибка при обновлении токена:", refreshError.message);
        });
    }
  }, [error]);

  const isEmptyList = !isLoading && !data?.length;

  return (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <Style.ContainerWrap>
          <Search />
          <S.CenterblockH2>Мои треки</S.CenterblockH2>
          {isLoading ? (
            `Загрузка треков...`
          ) : isEmptyList ? (
            `Не удалось загрузить плейлист, попробуйте позже`
          ) : (
            <Tracklist
              tracks={data}
              refetch={refetch}
              favTrackIds={favoriteTracks}
            />
          )}
        </Style.ContainerWrap>
        <LoginSidebar handleLogout={handleLogout} />
      </S.Main>
    </>
  );
};

Favorites.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
