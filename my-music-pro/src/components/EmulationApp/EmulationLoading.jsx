/* eslint-disable no-unused-vars */
import * as Style from "../Tracklist/Tracklist.styles.js";
import * as Styled from "../Sidebar/Sidebar.styles.js";
import * as S from "../AudioPlayer/AudioPlayer.styles.js";
import * as St from "./EmulationLoading.styles.js";

function EmulationTracklist() {
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
      <Style.ContentPlaylist>
        {Array(9)
          .fill(null)
          .map((item, index) => (
            <Style.PlaylistItem key={index}>
              <St.PlaylistTrack>
                <Style.TrackTitle>
                  <Style.TrackTitleImage>
                    <img
                      src="/icon/emulate_track-image.svg"
                      alt="Обложка трека загружается"
                    />
                  </Style.TrackTitleImage>
                  <div>
                    <Style.TrackTitleLink href="http://">
                      <img
                        src="/icon/emulate_track-name.svg"
                        alt="Название трека загружается"
                      />
                      <Style.TrackTitleSpan></Style.TrackTitleSpan>
                    </Style.TrackTitleLink>
                  </div>
                </Style.TrackTitle>
                <Style.TrackAuthor>
                  <Style.TrackAuthorLink href="http://">
                    <img
                      src="/icon/emulate_track-singer.svg"
                      alt="Имя исполнителя загружается"
                    />
                  </Style.TrackAuthorLink>
                </Style.TrackAuthor>
                <Style.TrackAlbum>
                  <Style.TrackAlbumLink href="http://">
                    <img
                      src="/icon/emulate_track-album.svg"
                      alt="Название альбома загружается"
                    />
                  </Style.TrackAlbumLink>
                </Style.TrackAlbum>
              </St.PlaylistTrack>
            </Style.PlaylistItem>
          ))}
      </Style.ContentPlaylist>
    </Style.CenterblockContent>
  );
}

function EmulationSidebar() {
  return (
    <Styled.MainSidebar>
      <Styled.SidebarPersonal>
        <Styled.SidebarPersonalName></Styled.SidebarPersonalName>
        <Styled.SidebarIcon>
          <svg alt="logout">
            <use xlinkHref="/icon/sprite.svg#logout"></use>
          </svg>
        </Styled.SidebarIcon>
      </Styled.SidebarPersonal>
      <Styled.SidebarBlock>
        <Styled.SidebarList>
          {Array(3)
            .fill(null)
            .map((item, index) => (
              <Styled.SidebarItem key={index}>
                <Styled.SidebarLink href="#">
                  <img
                    src="/icon/emulate_sidebar.svg"
                    alt="Сайдбар загружается"
                  />
                </Styled.SidebarLink>
              </Styled.SidebarItem>
            ))}
        </Styled.SidebarList>
      </Styled.SidebarBlock>
    </Styled.MainSidebar>
  );
}

function EmulationAudioPlayer() {
  return (
    <S.Bar>
      <S.BarContent>
        <S.BarPlayerProgress></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <S.PlayerControls>
              <S.PlayerBtnPrev>
                <S.PlayerBtnPrevSvg alt="prev">
                  <use xlinkHref="/icon/sprite.svg#icon-prev"></use>
                </S.PlayerBtnPrevSvg>
              </S.PlayerBtnPrev>
              <S.PlayerBtnPlay>
                <S.PlayerBtnPlaySvg alt="play">
                  <use xlinkHref="/icon/sprite.svg#icon-play"></use>
                </S.PlayerBtnPlaySvg>
              </S.PlayerBtnPlay>
              <S.PlayerBtnNext>
                <S.PlayerBtnNextSvg alt="next">
                  <use xlinkHref="/icon/sprite.svg#icon-next"></use>
                </S.PlayerBtnNextSvg>
              </S.PlayerBtnNext>
              <S.PlayerBtnRepeat>
                <S.PlayerBtnRepeatSvg alt="repeat">
                  <use xlinkHref="/icon/sprite.svg#icon-repeat"></use>
                </S.PlayerBtnRepeatSvg>
              </S.PlayerBtnRepeat>
              <S.PlayerBtnShuffle>
                <S.PlayerBtnShuffleSvg alt="shuffle">
                  <use xlinkHref="/icon/sprite.svg#icon-shuffle"></use>
                </S.PlayerBtnShuffleSvg>
              </S.PlayerBtnShuffle>
            </S.PlayerControls>

            <S.PlayerTrackPlay>
              <S.TrackPlayContain>
                <img
                  src="/icon/emulate_audioplayer.svg"
                  alt="Аудиоплеер загружается"
                />
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
                <S.VolumeProgressLine type="range" name="range" />
              </S.VolumeProgress>
            </S.VolumeContent>
          </S.VolumeBlock>
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  );
}

export { EmulationTracklist, EmulationSidebar, EmulationAudioPlayer };
