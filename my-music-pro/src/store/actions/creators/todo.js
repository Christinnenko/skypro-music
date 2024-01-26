import { getFavTracksApi } from "../../../services/todo";
import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  MIX_TRACK,
  PLAY,
  PAUSE,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  UPDATE_FAV_TRACKS,
} from "../types/todo";

export const setCurrentTrack = ({ playlist, track }) => ({
  type: SET_CURRENT_TRACK,
  payload: {
    playlist,
    track,
  },
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

export const addToFavorites = (favTrackId) => {
  console.log("Adding to favorites:", favTrackId);
  return {
    type: ADD_TO_FAVORITES,
    payload: { favTrackId },
  };
};

export const deleteFromFavorites = (favTrackId) => {
  console.log("Deleting from favorites:", favTrackId);
  return {
    type: DELETE_FROM_FAVORITES,
    payload: { favTrackId },
  };
};

export const updateFavTracks = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await getFavTracksApi.endpoints.getFavTracks({
        token,
      });

      console.log("Response from API:", data);

      dispatch({
        type: UPDATE_FAV_TRACKS,
        payload: data,
      });
    } catch (error) {
      console.error("Error updating fav tracks:", error);
    }
  };
};