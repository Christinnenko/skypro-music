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
  SET_FILTER,
  SET_SORTER,
  TOGGLE_LIKE,
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

export const setFilter = (filterIndex, selectedValues) => ({
  type: SET_FILTER,
  payload: { filterIndex, selectedValues },
});

export const setSorter = (sorterIndex, selectedValues) => ({
  type: SET_SORTER,
  payload: { sorterIndex, selectedValues },
});
