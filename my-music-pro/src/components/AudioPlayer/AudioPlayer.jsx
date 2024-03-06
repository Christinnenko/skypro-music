import { useEffect, useRef, useState } from "react";
import * as S from "./AudioPlayer.styles.js";
import PropTypes from "prop-types";
import { convertSecToMinAndSec } from "../../helpers.js";
import {
  nextTrack,
  previousTrack,
  mixTracks,
  play,
  pause,
  toggleLike,
} from "../../store/actions/creators/creators.js";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from "../../services/Services.js";

function AudioPlayer({ track }) {
  const [isPlaying, setIsPlaying] = useState(false); //воспроизведение трека
  const [isMix, setIsMix] = useState(false);
  const [isLooped, setIsLooped] = useState(false); //повторение трека по кругу
  const [currentTime, setCurrentTime] = useState(0); //текущее время воспроизведения аудио

  const dispatch = useDispatch();

  const [addToFavorites] = useAddToFavoritesMutation();
  const [deleteFromFavorites] = useDeleteFromFavoritesMutation();

  const token = JSON.parse(localStorage.access);
  const currentTrackId = useSelector((state) => state.player.currentTrack?.id);
  const pagePlaylist = useSelector((state) => state.player.pagePlaylist);
  const isFavorite = currentTrackId
    ? pagePlaylist.find((track) => track.id === currentTrackId).isFavorite
    : false;

  const handleToggleLike = (trackId, track) => {
    if (isFavorite) {
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
          dispatch(toggleLike(trackId));
        })
        .catch((error) => {
          console.error("Error adding to favorites:", error);
        });
    }
  };

  const handleMix = () => {
    if (!isMix) {
      setIsMix(true);
      dispatch(mixTracks(true));
    } else {
      setIsMix(false);
      dispatch(mixTracks(false));
    }
  };

  const audioRef = useRef(null);

  //нажатие на play
  const handleStart = () => {
    audioRef.current.play();
    setIsPlaying(true);
    dispatch(play());
  };

  //нажатие на stop
  const handleStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    dispatch(pause());
  };

  //кнопка play/pause
  const togglePlay = isPlaying ? handleStop : handleStart;

  const handleNextTrack = () => {
    dispatch(nextTrack());
  };

  const handlePreviousTrack = () => {
    if (audioRef.current && currentTime > 5) {
      audioRef.current.currentTime = 0;

      return;
    }
    dispatch(previousTrack());
  };

  //общая длительность трека
  const duration = audioRef.current?.duration || 0;
  const progressPercent = (currentTime / duration) * 100 || 0;

  //управление громкостью
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);

    const clampedVolume = Math.max(0, Math.min(1, newVolume));

    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  //воспроизведение следущего трека
  useEffect(() => {
    audioRef.current.load();
  }, [track]);

  //воспроизведение трека сразу после нажатия на название/автора/альбома
  useEffect(() => {
    audioRef.current.addEventListener("loadedmetadata", () => {
      handleStart();
    });
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleTrackEnd = () => {
      !isLooped && dispatch(nextTrack());
      isLooped && setCurrentTime(0);
      isLooped && handleStart(); // Перезапуск воспроизведения для зацикливания
    };

    // Удаление предыдущего слушателя перед добавлением нового
    if (audioRef.current) {
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      audioRef.current.removeEventListener("ended", handleTrackEnd);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("ended", handleTrackEnd);
    }

    updateCurrentTime();

    // Удаление слушателя при размонтировании компонента
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
        audioRef.current.removeEventListener("ended", handleTrackEnd);
      }
    };
  }, [audioRef, isLooped]);

  //перемотка трека при нажатии на ProgressBarClick
  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentClicked = (clickPosition / progressBar.offsetWidth) * 100;
    const newTime = (percentClicked / 100) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  //включение
  const handleLoop = () => {
    audioRef.current.loop = true;
    setIsLooped(true);
  };

  //выключение
  const handleUnloop = () => {
    audioRef.current.loop = false;
    setIsLooped(false);
  };
  const toggleLoop = isLooped ? handleUnloop : handleLoop;

  return (
    <>
      <S.StandartAudioPlayer controls ref={audioRef}>
        <source src={track.track_file} type="audio/mpeg" />
      </S.StandartAudioPlayer>
      <S.Bar>
        <S.BarContent>
          <S.TrackTime>
            {convertSecToMinAndSec(currentTime) +
              " " +
              "/" +
              " " +
              convertSecToMinAndSec(duration)}
          </S.TrackTime>
          <S.BarPlayerProgress onClick={handleProgressBarClick}>
            <S.BarPlayerProgressLoad
              style={{ width: `${progressPercent}%` }}
            ></S.BarPlayerProgressLoad>
          </S.BarPlayerProgress>

          <S.BarPlayerBlock>
            <S.BarPlayer>
              <S.PlayerControls>
                <S.PlayerBtnPrev onClick={() => handlePreviousTrack()}>
                  <S.PlayerBtnPrevSvg alt="prev">
                    <use xlinkHref="/icon/sprite.svg#icon-prev"></use>
                  </S.PlayerBtnPrevSvg>
                </S.PlayerBtnPrev>
                <S.PlayerBtnPlay>
                  <S.PlayerBtnPlaySvg alt="play" onClick={togglePlay}>
                    {isPlaying ? (
                      <use xlinkHref="/icon/sprite.svg#icon-pause"></use>
                    ) : (
                      <use xlinkHref="/icon/sprite.svg#icon-play"></use>
                    )}
                  </S.PlayerBtnPlaySvg>
                </S.PlayerBtnPlay>
                <S.PlayerBtnNext onClick={() => handleNextTrack()}>
                  <S.PlayerBtnNextSvg alt="next">
                    <use xlinkHref="/icon/sprite.svg#icon-next"></use>
                  </S.PlayerBtnNextSvg>
                </S.PlayerBtnNext>
                <S.PlayerBtnRepeat>
                  <S.PlayerBtnRepeatSvg
                    alt="repeat"
                    onClick={toggleLoop}
                    $isLooped={isLooped}
                  >
                    <use xlinkHref="/icon/sprite.svg#icon-repeat"></use>
                  </S.PlayerBtnRepeatSvg>
                </S.PlayerBtnRepeat>
                <S.PlayerBtnShuffle>
                  <S.PlayerBtnShuffleSvg
                    alt="shuffle"
                    onClick={() => handleMix()}
                    $isMix={isMix}
                  >
                    <use xlinkHref="/icon/sprite.svg#icon-shuffle"></use>
                  </S.PlayerBtnShuffleSvg>
                </S.PlayerBtnShuffle>
              </S.PlayerControls>

              <S.PlayerTrackPlay>
                <S.TrackPlayContain>
                  <S.TrackPlayImage>
                    <S.TrackPlaySvg alt="music">
                      <use xlinkHref="/icon/sprite.svg#icon-note"></use>
                    </S.TrackPlaySvg>
                  </S.TrackPlayImage>
                  <S.TrackPlayAuthor>
                    <S.TrackPlayAuthorLink href="http://">
                      {track.name}
                    </S.TrackPlayAuthorLink>
                  </S.TrackPlayAuthor>
                  <S.TrackPlayAlbum>
                    <S.TrackPlayAlbumLink href="http://">
                      {track.author}
                    </S.TrackPlayAlbumLink>
                  </S.TrackPlayAlbum>
                </S.TrackPlayContain>

                <S.TrackPlayLikeDis>
                  <S.TrackPlayLike>
                    <S.TrackPlayLikeSvg
                      alt="like"
                      onClick={() => handleToggleLike(track.id, track)}
                      className={isFavorite ? "liked" : ""}
                    >
                      <use xlinkHref="/icon/sprite.svg#icon-like"></use>
                    </S.TrackPlayLikeSvg>
                  </S.TrackPlayLike>
                </S.TrackPlayLikeDis>
              </S.PlayerTrackPlay>
            </S.BarPlayer>
            <S.VolumeBlock>
              <S.VolumeContent>
                <S.VolumeImage>
                  <S.VolumeSvg alt="volume">
                    <use xlinkHref="/icon/sprite.svg#icon-volume"></use>
                  </S.VolumeSvg>
                </S.VolumeImage>
                <S.VolumeProgress>
                  <S.VolumeProgressLine
                    type="range"
                    name="range"
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={(e) => handleVolumeChange(e)}
                  />
                </S.VolumeProgress>
              </S.VolumeContent>
            </S.VolumeBlock>
          </S.BarPlayerBlock>
        </S.BarContent>
      </S.Bar>
    </>
  );
}

AudioPlayer.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    author: PropTypes.string,
    track_file: PropTypes.string,
    isFavorite: PropTypes.bool,
  }).isRequired,
};

export default AudioPlayer;
