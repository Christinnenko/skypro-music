import { styled } from "styled-components";

export const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1920px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 50%;
  right: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
`;

export const BarContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export const TrackTime = styled.div`
  color: #696969;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const BarPlayerProgress = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background: #2e2e2e;
  cursor: pointer;
`;

export const BarPlayerProgressLoad = styled.div`
  position: absolute;
  top: 1px;
  left: 0;
  height: 8px;
  background: #b672ff;
`;

export const BarPlayerBlock = styled.div`
  height: 73px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: rgba(28, 28, 28, 0.5);
`;

export const BarPlayer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`;

export const VolumeBlock = styled.div`
  width: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 92px 0 0;
`;

export const PlayerControls = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 0 27px 0 31px;
`;

export const PlayerTrackPlay = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
`;

export const PlayerBtnPrev = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 23px;
  cursor: pointer;
`;

export const PlayerBtnPrevSvg = styled.svg`
  width: 15px;
  height: 14px;
`;

export const PlayerBtnPlay = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 23px;
  cursor: pointer;
`;

export const PlayerBtnPlaySvg = styled.svg`
  width: 22px;
  height: 20px;
  fill: #d9d9d9;
`;

export const PlayerBtnNext = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 28px;
  fill: #a53939;
  cursor: pointer;
`;

export const PlayerBtnNextSvg = styled.svg`
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: #d9d9d9;
`;

export const PlayerBtnRepeat = styled.div`
  margin-right: 24px;
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
`;

export const PlayerBtnRepeatSvg = styled.svg`
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: ${(props) => (props.$isLooped ? "#fff" : "#696969")};

  &:hover {
    stroke: ${(props) => (props.$isLooped ? "#fff" : "#acacac")};
  }

  &:active {
    stroke: #fff;
  }
`;

export const PlayerBtnShuffle = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
`;

export const PlayerBtnShuffleSvg = styled.svg`
  width: 19px;
  height: 12px;
  fill: transparent;
  stroke: ${(props) => (props.$isMix ? "#fff" : "#696969")};

  &:hover {
    stroke: ${(props) => (props.$isMix ? "#fff" : "#acacac")};
  }

  &:active {
    stroke: #fff;
  }
`;

export const TrackPlayContain = styled.div`
  width: auto;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: "image author" "image album";
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const TrackPlayImage = styled.div`
  width: 51px;
  height: 51px;
  background-color: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 12px;
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 1;
  grid-area: image;
`;

export const TrackPlaySvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;

export const TrackPlayAuthor = styled.div`
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  grid-area: author;
  min-width: 49px;
`;

export const TrackPlayAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  white-space: nowrap;
`;

export const TrackPlayAlbum = styled.div`
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  grid-area: album;
  min-width: 49px;
`;

export const TrackPlayAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
`;

export const TrackPlayLikeDis = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 26%;
`;

export const TrackPlayLike = styled.div`
  padding: 18px;
  cursor: pointer;
`;

export const TrackPlayLikeSvg = styled.svg`
  width: 14px;
  height: 12px;
  margin-right: 17px;
  cursor: pointer;

  use {
    fill: transparent;
    stroke: #696969;
  }

  &.liked use {
    fill: #b672ff;
    stroke: #b672ff;
  }

  &:hover use {
    stroke: #acacac;
  }

  &:active use {
    fill: #696969;
    stroke: #fff;
  }
`;

export const TrackPlayDislike = styled.div`
  margin-left: 28.5px;
  padding: 5px;
  cursor: pointer;
`;

export const TrackPlayDislikeSvg = styled.svg`
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;

  &:hover {
    stroke: #acacac;
  }
`;

export const VolumeContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: flex-end;
  -ms-flex-pack: flex-end;
  justify-content: flex-end;
  cursor: pointer;
`;

export const VolumeImage = styled.div`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

export const VolumeSvg = styled.svg`
  width: 13px;
  height: 18px;
  fill: transparent;
`;

export const VolumeProgress = styled.div`
  width: 109px;
  height: 30px;
  cursor: pointer;
`;

export const VolumeProgressLine = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  position: relative;

  &::-moz-range-track {
    height: 2px;
    border: 1px solid #1c1c1c;
    background-color: #fff;
    transform: translateY(7px);
  }

  &::-moz-range-thumb {
    background-color: #1c1c1c;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    cursor: pointer;
    transform: translateY(7px);
  }

  &::-webkit-slider-runnable-track {
    height: 2px;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  &::-webkit-slider-thumb {
    background-color: #1c1c1c;
    border: 2px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    width: 12px;
    height: 12px;
    -webkit-appearance: none;
    margin-top: -5px;
    position: relative;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 50%;
    height: 2px;
    background-color: #fff;
    transform: translateY(-50%);
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 50%;
    height: 2px;
    background-color: transparent;
    transform: translateY(-50%);
    z-index: 1;
  }
`;

export const StandartAudioPlayer = styled.audio`
  display: none;
`;
