import * as Style from "./Tracklist.styles.js";
import { convertSecToMinAndSec } from "../../helpers.js";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "../../store/actions/creators/todo.js";

import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from "../../services/todo.js";

function Tracklist({ tracks, getTracksError, refetch }) {
  console.log("Rendering Tracklist component");
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, favTrackIds } = useSelector(
    (store) => store.player
  );

  const [addToFavorites, { data: dataAdd, error: errorAdd }] =
    useAddToFavoritesMutation();
  const [deleteFromFavorites, { data: dataDelete, error: errorDelete }] =
    useDeleteFromFavoritesMutation();

  console.log(data, error);

  const handleCurrentTrackId = (track) => {
    console.log("Handling current track ID:", track.id);
    dispatch(setCurrentTrack({ playlist: tracks, track: track }));
  };

  const isTrackInFavorites = (trackId) => favTrackIds.includes(trackId);

  const token = JSON.parse(localStorage.access);

  const handleToggleFavoriteClick = (track) => {
    if (isTrackInFavorites(track.id)) {
      deleteFromFavorites({ id: track.id, token }).then(() => {
        refetch();
      });
    } else {
      addToFavorites({ id: track.id, token }).then(() => {
        refetch();
      });
    }

    // dispatch(updateIsFavorite({ trackId: track.id }));
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
                  onClick={() => handleToggleFavoriteClick(track)}
                  $isFavorite={isTrackInFavorites(track.id)}
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
