import { Categories } from "../../constants.js";
import { useParams } from "react-router-dom";
import * as Style from "../Pages.styles.js";
import * as S from "../../App.styles.js";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import { LoginSidebar } from "../../components/Sidebar/Sidebar.jsx";
import Search from "../../components/Search/Search.jsx";
import PropTypes from "prop-types";
import * as St from "../Pages.styles.js";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { useViewSelectionsByIdQuery } from "../../services/todo.js";
import { EmulationTracklist } from "../../components/EmulationApp/EmulationLoading.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Category = ({ handleLogout }) => {
  const params = useParams();
  const category = Categories.find(
    (category) => category.id === Number(params.id)
  );
  const categoryId = `${category.id}`;
  const title = `${category.title}`;
  const { data, isLoading, error, refetch } = useViewSelectionsByIdQuery({
    id: categoryId,
  });

  const searchQuery = useSelector((state) => state.player.searchQuery);
  const [filteredTracks, setFilteredTracks] = useState([]);

  useEffect(() => {
    if (data) {
      const updatedFilteredTracks = data.filter(
        (track) =>
          track.name &&
          track.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      console.log("Search Query:", searchQuery);
      console.log("Filtered Tracks:", updatedFilteredTracks);
      setFilteredTracks(updatedFilteredTracks);
    }
  }, [searchQuery, data]);

  const isEmptyList = !isLoading && !data?.length;

  return (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <div style={{ minWidth: "1070px", justifyContent: "space-between" }}>
          <Search />
          <Style.Text>{`${title}`}</Style.Text>
          {error ? (
            <p>Не удалось загрузить плейлист, попробуйте позже</p>
          ) : isLoading ? (
            <EmulationTracklist />
          ) : isEmptyList ? (
            `Треки в разделе отсутствуют`
          ) : (
            <Tracklist tracks={filteredTracks} refetch={refetch} />
          )}
        </div>
        <St.ContainerSidebar>
          <LoginSidebar handleLogout={handleLogout} />
        </St.ContainerSidebar>
      </S.Main>
    </>
  );
};

Category.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
