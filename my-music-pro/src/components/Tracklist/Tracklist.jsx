import * as Style from "./Tracklist.styles.js";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentTrack,
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
  const { isMix } = useSelector((store) => store.player);
  const navigate = useNavigate();
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
    }
  }, [errorAdd, errorDelete]);

  const handleToggleLike = (trackId, track) => {
    if (track.isFavorite) {
      deleteFromFavorites({ id: trackId })
        .then(() => {
          console.log("Toggling like for track:", track);
          dispatch(toggleLike(trackId));
        })
        .catch((error) => {
          console.error("Error deleting from favorites:", error);
        });
    } else {
      addToFavorites({ id: trackId, token })
        .then(() => {
          console.log("Toggling like for track:", track);
          dispatch(toggleLike(trackId));
        })
        .catch((error) => {
          console.error("Error adding to favorites:", error);
        });
    }
  };

  const handleCurrentTrackId = (track) => {
    console.log("Handling current track ID:", track.id);
    dispatch(setCurrentTrack({ playlist: tracks, track: track }));
    if (isMix) {
      dispatch(mixTracks(true));
    }
  };

  // const filteredPlaylist = useSelector(
  //   (state) => state.player.filteredPlaylist
  // );
  // const isActiveAuthor = useSelector((state) => state.player.isActiveAuthor);
  // const isActiveGenre = useSelector((state) => state.player.isActiveGenre);

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
        {tracks.length === 0 ? (
          <p>Треков нет</p>
        ) : (
          tracks.map((track) => (
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
