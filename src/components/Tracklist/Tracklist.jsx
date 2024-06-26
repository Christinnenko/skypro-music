import * as Style from "./Tracklist.styles.js";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentTrack,
  clearFilters,
  mixTracks,
  setCurrentTrack,
  toggleLike,
} from "../../store/actions/creators/creators.js";
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from "../../services/Services.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Track } from "../Track/Track.jsx";

function Tracklist({ tracks, getTracksError }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { FilterCriteria } = useSelector((store) => store.player);
  const { isMix } = useSelector((store) => store.player);

  const token = JSON.parse(localStorage.access);

  const [addToFavorites, { error: errorAdd }] = useAddToFavoritesMutation();
  const [deleteFromFavorites, { error: errorDelete }] =
    useDeleteFromFavoritesMutation();

  useEffect(() => {
    if (
      (errorAdd && errorAdd.status == 401) ||
      (errorDelete && errorDelete.status == 401)
    ) {
      localStorage.removeItem("user");
      dispatch(clearCurrentTrack());
      navigate("/login");
      dispatch(clearFilters());
    }
  }, [errorAdd, errorDelete]);

  const handleToggleLike = (trackId, track) => {
    if (track.isFavorite) {
      deleteFromFavorites({ id: trackId })
        .then(() => {
          dispatch(toggleLike(trackId));
        })
        .catch((error) => {
          console.error("Error deleting from favorites:", error);
        });
    } else {
      addToFavorites({ id: trackId, token })
        .then(() => {
          dispatch(toggleLike(trackId));
        })
        .catch((error) => {
          console.error("Error adding to favorites:", error);
        });
    }
  };

  const handleCurrentTrackId = (track) => {
    dispatch(setCurrentTrack({ playlist: tracks, track: track }));
    if (isMix) {
      dispatch(mixTracks(true));
    }
  };

  const filteredPlaylist = useSelector(
    (state) => state.player.filteredPlaylist
  );

  const filterTracks = () => {
    let tracks = [...filteredPlaylist];

    if (FilterCriteria.author.length) {
      tracks = tracks.filter((el) => FilterCriteria.author.includes(el.author));
    }

    if (FilterCriteria.genre.length) {
      tracks = tracks.filter((el) => FilterCriteria.genre.includes(el.genre));
    }

    switch (FilterCriteria.sortButtonText) {
      case "Сначала старые":
        tracks.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
        break;
      case "Сначала новые":
        tracks.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        break;
      default:
        break;
    }

    return tracks;
  };

  const filteredTracks = filterTracks();

  return (
    <Style.CenterblockContent>
      <Style.ContentTitle>
        <Style.PlaylistTitleColCol01>Трек</Style.PlaylistTitleColCol01>
        <Style.PlaylistTitleColCol02>ИСПОЛНИТЕЛЬ</Style.PlaylistTitleColCol02>
        <Style.PlaylistTitleColCol03>АЛЬБОМ</Style.PlaylistTitleColCol03>
        <Style.PlaylistTitleColCol04>
          <Style.PlaylistTitleSvg alt="time">
            <use xlinkHref="/icon/sprite.svg#icon-watch"></use>
          </Style.PlaylistTitleSvg>
        </Style.PlaylistTitleColCol04>
      </Style.ContentTitle>

      <p>{getTracksError}</p>

      <Style.ContentPlaylist>
        {!filteredTracks.length ? (
          <>Ничего не найдено *_*</>
        ) : (
          filteredTracks.map((track) => (
            <Style.PlaylistItem key={track.id}>
              <Track
                track={track}
                handleCurrentTrackId={handleCurrentTrackId}
                handleToggleLike={() => handleToggleLike(track.id, track)}
              />
            </Style.PlaylistItem>
          ))
        )}
      </Style.ContentPlaylist>
    </Style.CenterblockContent>
  );
}

Tracklist.propTypes = {
  tracks: PropTypes.array.isRequired,
  getTracksError: PropTypes.any,
};

export default Tracklist;
