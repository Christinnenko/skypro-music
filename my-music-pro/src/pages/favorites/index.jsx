import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import * as Style from "../Pages.styles.js";
import PropTypes from "prop-types";
import * as S from "../../App.styles.js";
import { LoginSidebar } from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { useGetFavTracksQuery } from "../../services/todo.js";

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
  const token = localStorage.getItem("access");

  const { data, error, isLoading } = useGetFavTracksQuery({ token });

  const isEmptyList = !isLoading && !data?.length;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isEmptyList) {
    return <p>No tracks, yay!</p>;
  }

  return (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <Style.ContainerWrap>
          <Search />
          <S.CenterblockH2>Мои треки</S.CenterblockH2>
          <Tracklist tracks={data} />
        </Style.ContainerWrap>
        <LoginSidebar handleLogout={handleLogout} />
      </S.Main>
    </>
  );
};

Favorites.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
