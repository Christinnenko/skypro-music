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
} from "../actions/types/types";

// 1.
const initialState = {
  currentTrack: null,
  allIds: [],
  isPlaying: null,
  tracks: [],
  isMix: false,
  likedTracks: [],
  isFavorite: false,
  playlist: [],
  searchQuery: "",
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
        content = playlist[0];
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
      const isMixValue = action.payload.isMix;
      console.log(isMixValue);
      return {
        ...state,

        isMix: isMixValue ? isMixValue : !state.isMix,
        mixTracks: [...state.tracks].sort(() => 0.5 - Math.random()),
      };
    }

    case SET_SEARCH_QUERY: {
      const query = action.payload;
      return {
        ...state,
        searchQuery: query,
      };
    }

    case CLEAR_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: "",
      };
    }

    case TOGGLE_LIKE: {
      const { track } = action.payload;

      return {
        ...state,
        likedTracks: state.likedTracks.includes(track)
          ? state.likedTracks.filter((likedTrack) => likedTrack !== track)
          : [...state.likedTracks, track],
        isFavorite: !state.isFavorite,
      };
    }

    default:
      return state;
  }
}
