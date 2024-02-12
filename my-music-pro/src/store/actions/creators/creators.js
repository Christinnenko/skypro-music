import {
  SET_CURRENT_TRACK,
  CLEAR_CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  MIX_TRACK,
  PLAY,
  PAUSE,
  SET_SEARCH_QUERY,
  CLEAR_SEARCH_QUERY,
  TOGGLE_LIKE,
  SET_PAGE_PLAYLIST,
} from "../types/types";

export const setCurrentTrack = ({ playlist, track }) => ({
  type: SET_CURRENT_TRACK,
  payload: {
    playlist,
    track,
  },
});

export const toggleLike = (track) => ({
  type: TOGGLE_LIKE,
  payload: { track },
});

export const clearCurrentTrack = () => ({
  type: CLEAR_CURRENT_TRACK,
});

export const play = () => ({
  type: PLAY,
});

export const pause = () => ({
  type: PAUSE,
});

export const nextTrack = () => ({
  type: NEXT_TRACK,
});

export const previousTrack = () => ({
  type: PREVIOUS_TRACK,
});

export const mixTracks = (isMix) => ({
  type: MIX_TRACK,
  payload: {
    isMix,
  },
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const clearSearchQuery = () => ({
  type: CLEAR_SEARCH_QUERY,
});

export const setPagePlaylist = ({ fetchedTracks }) => ({
  type: SET_PAGE_PLAYLIST,
  payload: { fetchedTracks },
});
