import { useSelector } from "react-redux";
import * as Style from "../Tracklist/Tracklist.styles";
import { convertSecToMinAndSec } from "../../helpers";
import PropTypes from "prop-types";

export const Track = ({ track, handleCurrentTrackId, handleToggleLike }) => {
  const { currentTrack, isPlaying } = useSelector((store) => store.player);
  const { isFavorite } = track;

  if (!track || typeof track.id === "undefined") {
    return null;
  }

  return (
    <Style.PlaylistTrack>
      <Style.TrackTitle>
        <Style.TrackTitleImage>
          {currentTrack && currentTrack.id === track.id ? (
            <Style.BlinkingDot $isPlaying={isPlaying}></Style.BlinkingDot>
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
        <Style.TrackAuthorLink onClick={() => handleCurrentTrackId(track)}>
          {track.author}
        </Style.TrackAuthorLink>
      </Style.TrackAuthor>
      <Style.TrackAlbum>
        <Style.TrackAlbumLink onClick={() => handleCurrentTrackId(track)}>
          {track.album}
        </Style.TrackAlbumLink>
      </Style.TrackAlbum>
      <Style.TrackLikeTime>
        <Style.TrackLikeSvg
          alt="like"
          onClick={() => handleToggleLike(track.id, track)}
          className={isFavorite ? "liked" : ""}
        >
          <use xlinkHref="/icon/sprite.svg#icon-like"></use>
        </Style.TrackLikeSvg>

        <Style.TrackTimeText>
          {convertSecToMinAndSec(track.duration_in_seconds)}
        </Style.TrackTimeText>
      </Style.TrackLikeTime>
    </Style.PlaylistTrack>
  );
};

Track.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    author: PropTypes.string,
    track_file: PropTypes.string,
    isFavorite: PropTypes.bool,
    logo: PropTypes.string,
    album: PropTypes.string,
    duration_in_seconds: PropTypes.number,
  }).isRequired,
  handleCurrentTrackId: PropTypes.func.isRequired,
  handleToggleLike: PropTypes.func.isRequired,
};
