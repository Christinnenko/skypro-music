import * as Style from "./Tracklist.styles.js";
import { convertSecToMinAndSec } from "../../helpers.js";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../store/actions/creators/todo.js";

function Tracklist({ handleTrackPlay, tracks, getTracksError }) {
  const dispatch = useDispatch();

  const handleCurrentTrackId = (track) => {
    dispatch(setCurrentTrack(track.id, track, tracks));
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
                  <Style.BlinkingDot alt="music"> </Style.BlinkingDot>

                  <Style.TrackTitleSvg alt="music">
                    <use xlinkHref="/icon/sprite.svg#icon-note"></use>
                    {track.logo}
                  </Style.TrackTitleSvg>
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
                <Style.TrackAuthorLink onClick={() => handleTrackPlay(track)}>
                  {track.author}
                </Style.TrackAuthorLink>
              </Style.TrackAuthor>
              <Style.TrackAlbum>
                <Style.TrackAlbumLink onClick={() => handleTrackPlay(track)}>
                  {track.album}
                </Style.TrackAlbumLink>
              </Style.TrackAlbum>
              <div>
                <Style.TrackTimeSvg alt="time">
                  <use xlinkHref="/icon/sprite.svg#icon-like"></use>
                </Style.TrackTimeSvg>
                <Style.TrackTimeText>
                  {convertSecToMinAndSec(track.duration_in_seconds)}
                </Style.TrackTimeText>
              </div>
            </Style.PlaylistTrack>
          </Style.PlaylistItem>
        ))}
      </Style.ContentPlaylist>
    </Style.CenterblockContent>
  );
}

Tracklist.propTypes = {
  handleTrackPlay: PropTypes.func.isRequired,
  tracks: PropTypes.array.isRequired,
  getTracksError: PropTypes.any,
};

export default Tracklist;
