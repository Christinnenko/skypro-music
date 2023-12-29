import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  MIX_TRACK,
} from "../types/todo";

export const setCurrentTrack = (id, content, isPlaying, tracks) => ({
  type: SET_CURRENT_TRACK,
  payload: {
    id,
    content,
    isPlaying,
    tracks,
  },
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
