import { useEffect, useState } from "react";
import { getAllTracks } from "../../api.js";
import * as Style from "./Tracklist.styles.js";
import { convertSecToMinAndSec } from "../../helpers.js";
import PropTypes from "prop-types";

function Tracklist({ handleTrackPlay, setLoading }) {
  const [tracks, setTracks] = useState([]);

  const [getTracksError, setGetTracksError] = useState(false);

  useEffect(() => {
    getAllTracks()
      .then((tracks) => {
        setTracks(tracks);
        setLoading(false);
      })
      .catch((error) => {
        setGetTracksError(
          `Не удалось загрузить плейлист, попробуйте позже: ${error.message}`
        );
      });
  }, []);

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
                  <Style.TrackTitleSvg alt="music">
                    {track.logo}
                  </Style.TrackTitleSvg>
                </Style.TrackTitleImage>
                <div>
                  <Style.TrackTitleLink onClick={() => handleTrackPlay(track)}>
                    {track.name} <Style.TrackTitleSpan></Style.TrackTitleSpan>
                  </Style.TrackTitleLink>
                </div>
              </Style.TrackTitle>
              <Style.TrackAuthor>
                <Style.TrackAuthorLink href={track.track_file}>
                  {track.author}
                </Style.TrackAuthorLink>
              </Style.TrackAuthor>
              <Style.TrackAlbum>
                <Style.TrackAlbumLink href={track.track_file}>
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
  setLoading: PropTypes.func.isRequired,
};

export default Tracklist;
