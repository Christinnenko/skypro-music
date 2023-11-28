import "../Tracklist/Tracklist.css";
import "../Sidebar/Sidebar.css";
import "../AudioPlayer/AudioPlayer.css";
import "./EmulationLoading.css";

function EmulationTracklist() {
  return (
    <div className="centerblock__content">
      <div className="content__title playlist-title">
        <div className="playlist-title__col col01">Трек</div>
        <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
        <div className="playlist-title__col col03">АЛЬБОМ</div>
        <div className="playlist-title__col col04">
          <svg className="playlist-title__svg" alt="time">
            <use xlinkHref="/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className="content__playlist playlist">
        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="playlist__item">
          <div className="playlist__track track">
            <div className="track__title">
              <div className="track__title-image">
                <img
                  src="/icon/emulate_track-image.svg"
                  alt="Обложка трека загружается"
                />
              </div>
              <div className="track__title-text">
                <a className="track__title-link" href="http://">
                  <img
                    src="/icon/emulate_track-name.svg"
                    alt="Название трека загружается"
                  />
                  <span className="track__title-span"></span>
                </a>
              </div>
            </div>
            <div className="track__author">
              <a className="track__author-link" href="http://">
                <img
                  src="/icon/emulate_track-singer.svg"
                  alt="Имя исполнителя загружается"
                />
              </a>
            </div>
            <div className="track__album">
              <a className="track__album-link" href="http://">
                <img
                  src="/icon/emulate_track-album.svg"
                  alt="Название альбома загружается"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmulationSidebar() {
  return (
    <div className="main__sidebar sidebar">
      <div className="sidebar__personal">
        <p className="sidebar__personal-name">Sergey.Ivanov</p>
        <div className="sidebar__icon">
          <svg alt="logout">
            <use xlinkHref="/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className="sidebar__block">
        <div className="sidebar__list">
          <div className="sidebar__item">
            <a className="sidebar__link" href="#">
              <img src="/icon/emulate_sidebar.svg" alt="Сайдбар загружается" />
            </a>
          </div>
          <div className="sidebar__item">
            <a className="sidebar__link" href="#">
              <img src="/icon/emulate_sidebar.svg" alt="Сайдбар загружается" />
            </a>
          </div>
          <div className="sidebar__item">
            <a className="sidebar__link" href="#">
              <img src="/icon/emulate_sidebar.svg" alt="Сайдбар загружается" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmulationAudioPlayer() {
  return (
    <div className="bar">
      <div className="bar__content">
        <div className="bar__player-progress"></div>
        <div className="bar__player-block">
          <div className="bar__player player">
            <div className="player__controls">
              <div className="player__btn-prev">
                <svg className="player__btn-prev-svg" alt="prev">
                  <use xlinkHref="/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className="player__btn-play _btn">
                <svg className="player__btn-play-svg" alt="play">
                  <use xlinkHref="/icon/sprite.svg#icon-play"></use>
                </svg>
              </div>
              <div className="player__btn-next">
                <svg className="player__btn-next-svg" alt="next">
                  <use xlinkHref="/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div className="player__btn-repeat _btn-icon">
                <svg className="player__btn-repeat-svg" alt="repeat">
                  <use xlinkHref="/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className="player__btn-shuffle _btn-icon">
                <svg className="player__btn-shuffle-svg" alt="shuffle">
                  <use xlinkHref="/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className="player__track-play track-play">
              <div className="track-play__contain">
                <img
                  src="/icon/emulate_audioplayer.svg"
                  alt="Аудиоплеер загружается"
                />
              </div>

              <div className="track-play__like-dis">
                <div className="track-play__like _btn-icon">
                  <svg className="track-play__like-svg" alt="like">
                    <use xlinkHref="/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className="track-play__dislike _btn-icon">
                  <svg className="track-play__dislike-svg" alt="dislike">
                    <use xlinkHref="/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="bar__volume-block volume">
            <div className="volume__content">
              <div className="volume__image">
                <svg className="volume__svg" alt="volume">
                  <use xlinkHref="/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className="volume__progress _btn">
                <input
                  className="volume__progress-line _btn"
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EmulationTracklist, EmulationSidebar, EmulationAudioPlayer };
