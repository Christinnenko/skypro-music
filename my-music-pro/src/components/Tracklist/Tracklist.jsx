import * as Style from "./Tracklist.styles.js";
import { convertSecToMinAndSec } from "../../helpers.js";
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

function Tracklist({ tracks, getTracksError }) {
  console.log("Rendering Tracklist component");
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, isMix } = useSelector(
    (store) => store.player
  );
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.access);

  const [addToFavorites, { error: errorAdd }] = useAddToFavoritesMutation();
  const [deleteFromFavorites, { error: errorDelete }] =
    useDeleteFromFavoritesMutation();
  const { isFavorite } = useSelector((store) => store.player);

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
                  onClick={handleToggleLike(track)}
                  isFavorite={isFavorite}
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
