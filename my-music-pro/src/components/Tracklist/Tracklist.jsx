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
  console.log("Rendering Tracklist component");
  const dispatch = useDispatch();
  const { isMix } = useSelector((store) => store.player);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.access);

  const [addToFavorites, { error: errorAdd }] = useAddToFavoritesMutation();
  const [deleteFromFavorites, { error: errorDelete }] =
    useDeleteFromFavoritesMutation();
  const { isFavorite } = tracks;
  console.log("like", tracks);

  const handleToggleLike = (track) => {
    return () => {
      if (isFavorite) {
        deleteFromFavorites({ id: track.id })
          .then(() => {
            console.log("Toggling like for track:", track);
          })
          .catch((error) => {
            console.error("Error deleting from favorites:", error);
          });
      } else {
        addToFavorites({ id: track.id, token })
          .then(() => {
            console.log("Toggling like for track:", track);
          })
          .catch((error) => {
            console.error("Error adding to favorites:", error);
          });
      }

      // Обернуть трек в объект с именем "track"
      dispatch(toggleLike({ track }));
    };
  };

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

  const handleCurrentTrackId = (track) => {
    console.log("Handling current track ID:", track.id);
    dispatch(setCurrentTrack({ playlist: tracks, track: track }));
    if (isMix) {
      dispatch(mixTracks(true));
    }
  };

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
        {tracks.map((track) => (
          <Style.PlaylistItem key={track.id}>
            <Track
              track={track}
              handleCurrentTrackId={handleCurrentTrackId}
              handleToggleLike={handleToggleLike}
            />
          </Style.PlaylistItem>
        ))}
      </Style.ContentPlaylist>
    </Style.CenterblockContent>
  );
}

Tracklist.propTypes = {
  tracks: PropTypes.array.isRequired,
  getTracksError: PropTypes.any,
  refetch: PropTypes.func.isRequired,
};

export default Tracklist;
