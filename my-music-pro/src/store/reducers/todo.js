// import { mixArray } from "../../helpers";
import {
  SET_CURRENT_TRACK,
  CLEAR_CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  MIX_TRACK,
  PLAY,
  PAUSE,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  UPDATE_FAV_TRACKS,
} from "../actions/types/todo";

// 1.
const initialState = {
  currentTrack: null,
  allIds: [],
  isPlaying: null,
  tracks: [],
  isMix: false,
  favTrackIds: [],
  isFavorite: false,
  playlist: [],
};

// 2.
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    // 3.
    case SET_CURRENT_TRACK: {
      // 4.

      const { track, playlist } = action.payload;

      // 5.
      return {
        ...state,
        currentTrack: track,
        tracks: playlist,
        isPlaying: true,
      };
    }

    case CLEAR_CURRENT_TRACK: {
      return {
        ...state,
        currentTrack: null,
        isPlaying: false,
      };
    }

    case PLAY: {
      return {
        ...state,
        isPlaying: true,
      };
    }

    case PAUSE: {
      return {
        ...state,
        isPlaying: false,
      };
    }

    case NEXT_TRACK: {
      const playlist = state.isMix ? state.mixTracks : state.tracks;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack.id
      );
      let content = playlist[currentTrackIndex + 1];

      if (!content && state.isMix) {
        // Если дошли до конца перемешанного плейлиста, возвращаемся к началу
        content = state.mixTracks[0];
      }

      if (!content) {
        return state;
      }

      return {
        ...state,
        currentTrack: content,
      };
    }

    case PREVIOUS_TRACK: {
      const playlist = state.isMix ? state.mixTracks : state.tracks;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack.id
      );
      let content = playlist[currentTrackIndex - 1];

      if (!content) {
        return state;
      }

      return {
        ...state,
        currentTrack: content,
      };
    }

    case MIX_TRACK: {
      const page = location.pathname;
      if (page === "/favotites") {
        state.tracks = state.favTrackIds;
      }
      return {
        ...state,
        isMix: !state.isMix,
        mixTracks: [...state.tracks].sort(() => 0.5 - Math.random()),
      };
    }

    // case MIX_TRACK:
    //   if (!state.isMix) {
    //     const mixTracks = mixArray([...state.playlist]);
    //     return {
    //       ...state,
    //       mixTracks: mixTracks,
    //       isMix: true,
    //     };
    //   } else {
    //     const trackIndex = state.playlist.indexOf(state.track);
    //     return {
    //       ...state,
    //       isMix: false,
    //       mixTracks: [],
    //       currentTrackIndex: trackIndex,
    //     };
    //   }

    case ADD_TO_FAVORITES: {
      return {
        ...state,
        favTrackIds: [...state.favTrackIds, action.payload.favTrackId],
      };
    }

    case DELETE_FROM_FAVORITES: {
      return {
        ...state,
        favTrackIds: state.favTrackIds.filter(
          (id) => id !== action.payload.favTrackId
        ),
      };
    }

    case UPDATE_FAV_TRACKS: {
      return {
        ...state,
        favTrackIds: action.payload,
      };
    }

    default:
      return state;
  }
}
