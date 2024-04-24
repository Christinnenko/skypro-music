import {
  SET_CURRENT_TRACK,
  CLEAR_CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  MIX_TRACK,
  PLAY,
  PAUSE,
  SET_PAGE_PLAYLIST,
  TOGGLE_LIKE,
  SET_INITIAL_TRACKS,
  SET_FILTER,
  SET_SEARCH,
  CLEAR_FILTERS,
} from "../types/types";

export const setCurrentTrack = ({ playlist, track }) => ({
  type: SET_CURRENT_TRACK,
  payload: {
    playlist,
    track,
  },
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

export const setPagePlaylist = ({ fetchedTracks }) => ({
  type: SET_PAGE_PLAYLIST,
  payload: { fetchedTracks },
});

export const toggleLike = (trackId) => ({
  type: TOGGLE_LIKE,
  payload: { trackId },
});

export const setInitialTracksForFilter = ({ tracks }) => ({
  type: SET_INITIAL_TRACKS,
  payload: {
    data: tracks,
  },
});

export const setFilter = ({ name, item, tracks }) => ({
  type: SET_FILTER,
  payload: {
    name,
    item,
    tracks,
  },
});

export const setSearch = ({ value, tracks }) => ({
  type: SET_SEARCH,
  payload: {
    value,
    tracks,
  },
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});
