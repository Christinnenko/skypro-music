import { useEffect, useRef, useState } from "react";
import * as S from "./AudioPlayer.styles.js";
import PropTypes from "prop-types";
import { convertSecToMinAndSec } from "../../helpers.js";
import {
  setCurrentTrack,
  nextTrack,
  previousTrack,
  mixTracks,
} from "../../store/actions/creators/todo.js";
import { useDispatch } from "react-redux";

function AudioPlayer({ track, tracks, currentTrack }) {
  const [isPlaying, setIsPlaying] = useState(false); //воспроизведение трека
  const [isMix, setIsMix] = useState(false);

  const dispatch = useDispatch();

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
    const isPlaying = true;
    dispatch(setCurrentTrack(currentTrack.id, currentTrack, isPlaying, tracks));
  };

  //нажатие на stop
  const handleStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    const isPlaying = false;
    dispatch(setCurrentTrack(currentTrack.id, currentTrack, isPlaying, tracks));
  };

  //кнопка плей/пауза
  const togglePlay = isPlaying ? handleStop : handleStart;

  const handleNextTrack = () => {
    dispatch(nextTrack());
  };

  const handlePreviousTrack = () => {
    dispatch(previousTrack());
  };

  //текущее время воспроизведения аудио
  const [currentTime, setCurrentTime] = useState(0);

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

    // Удаление предыдущего слушателя перед добавлением нового
    if (audioRef.current) {
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
    }

    updateCurrentTime(); // Вызов функции

    if (audioRef.current && audioRef.current.ended) {
      !isLooped && dispatch(nextTrack());
      isLooped && setCurrentTime(0);
      isLooped && audioRef.current.play();
    }

    // Удаление слушателя при размонтировании компонента
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      }
    };
  }, [audioRef, isLooped]);

  //сброс прогресса проигрывания трека после его окончания
  useEffect(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);

      // Проверяем, завершено ли проигрывание
      if (audioRef.current.currentTime === audioRef.current.duration) {
        setCurrentTime(0);
        setIsPlaying(false);
      }
    }
  }, [audioRef.current, audioRef.current?.currentTime]);

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

  //повторение трека по кругу
  const [isLooped, setIsLooped] = useState(false);
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
                <S.PlayerBtnShuffle onClick={() => handleMix()}>
                  <S.PlayerBtnShuffleSvg alt="shuffle">
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
                    <S.TrackPlayLikeSvg alt="like">
                      <use xlinkHref="/icon/sprite.svg#icon-like"></use>
                    </S.TrackPlayLikeSvg>
                  </S.TrackPlayLike>
                  <S.TrackPlayDislike>
                    <S.TrackPlayDislikeSvg alt="dislike">
                      <use xlinkHref="/icon/sprite.svg#icon-dislike"></use>
                    </S.TrackPlayDislikeSvg>
                  </S.TrackPlayDislike>
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
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    track_file: PropTypes.string.isRequired,
  }).isRequired,
  handleStop: PropTypes.func.isRequired,
  handleStart: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  audioRef: PropTypes.object.isRequired,
  tracks: PropTypes.array.isRequired,
  currentTrack: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AudioPlayer;
