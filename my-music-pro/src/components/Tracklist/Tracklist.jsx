import * as Style from "./Tracklist.styles.js";
import { convertSecToMinAndSec } from "../../helpers.js";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTrack,
  updateFavTracks,
} from "../../store/actions/creators/todo.js";
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from "../../services/todo.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Tracklist({ tracks, getTracksError, refetch }) {
  const dispatchEvent = useDispatch();
  const { currentTrack, isPlaying, favTrackIds } = useSelector(
    (store) => store.player
  );

  const [addToFavorites, { error: errorAdd }] = useAddToFavoritesMutation();
  const [deleteFromFavorites, { error: errorDelete }] =
    useDeleteFromFavoritesMutation();

  const navigate = useNavigate();

  if (
    (errorAdd && errorAdd?.status == 401) ||
    (errorDelete && errorDelete?.status == 401)
  ) {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const handleCurrentTrackId = (track) => {
    console.log("Handling current track ID:", track.id);
    dispatchEvent(setCurrentTrack({ playlist: tracks, track: track }));
  };

  const isTrackInFavorites = (trackId) => favTrackIds.includes(trackId);

  const token = JSON.parse(localStorage.access);

  const [trackLikes, setTrackLikes] = useState(
    tracks.reduce((acc, track) => {
      acc[track.id] = isTrackInFavorites(track.id);
      return acc;
    }, {})
  );

  const handleToggleFavoriteClick = async (track) => {
    const updatedLikes = { ...trackLikes };
    const isFavorite = !updatedLikes[track.id];
    updatedLikes[track.id] = isFavorite;
    setTrackLikes(updatedLikes);

    try {
      if (isFavorite) {
        await addToFavorites({ id: track.id, token });
      } else {
        await deleteFromFavorites({ id: track.id, token });
      }

      // Передаем токен напрямую в функцию updateFavTracks
      await updateFavTracks(token);

      refetch();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // dispatch(updateIsFavorite({ trackId: track.id }));
  // };

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
            <Style.PlaylistTrack>
              <Style.TrackTitle>
                <Style.TrackTitleImage>
                  {currentTrack && currentTrack.id === track.id ? (
                    <Style.BlinkingDot
                      $isPlaying={isPlaying}
                    ></Style.BlinkingDot>
                  ) : (
                    <Style.TrackTitleSvg alt="music">
                      <use xlinkHref="/icon/sprite.svg#icon-note"></use>
                      {track.logo}
                    </Style.TrackTitleSvg>
                  )}
                </Style.TrackTitleImage>
                <div>
                  <Style.TrackTitleLink
                    onClick={() => {
                      handleCurrentTrackId(track);
                    }}
                  >
                    {track.name} <Style.TrackTitleSpan></Style.TrackTitleSpan>
                  </Style.TrackTitleLink>
                </div>
              </Style.TrackTitle>
              <Style.TrackAuthor>
                <Style.TrackAuthorLink
                  onClick={() => handleCurrentTrackId(track)}
                >
                  {track.author}
                </Style.TrackAuthorLink>
              </Style.TrackAuthor>
              <Style.TrackAlbum>
                <Style.TrackAlbumLink
                  onClick={() => handleCurrentTrackId(track)}
                >
                  {track.album}
                </Style.TrackAlbumLink>
              </Style.TrackAlbum>
              <Style.TrackLikeTime>
                <Style.TrackLikeSvg
                  alt="like"
                  onClick={() => handleToggleFavoriteClick(track)}
                  $isFavorite={trackLikes[track.id]}
                >
                  <use xlinkHref="/icon/sprite.svg#icon-like"></use>
                </Style.TrackLikeSvg>

                <Style.TrackTimeText>
                  {convertSecToMinAndSec(track.duration_in_seconds)}
                </Style.TrackTimeText>
              </Style.TrackLikeTime>
            </Style.PlaylistTrack>
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
