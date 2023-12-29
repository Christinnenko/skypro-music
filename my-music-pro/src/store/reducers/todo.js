import {
  SET_CURRENT_TRACK,
  NEXT_TRACK,
  PREVIOUS_TRACK,
  MIX_TRACK,
} from "../actions/types/todo";

// 1.
const initialState = {
  currentTrack: {},
  allIds: [],
  isPlaying: null,
  tracks: [],
  isMix: false,
};

// 2.
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    // 3.
    case SET_CURRENT_TRACK: {
      // 4.

      const { id, content, isPlaying, tracks } = action.payload;

      // 5.
      return {
        id: id,
        ...state,
        currentTrack: { content },
        isPlaying: isPlaying,
        tracks: tracks,
      };
    }

    case NEXT_TRACK: {
      const playlist = state.isMix ? state.mixTracks : state.tracks;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack.content.id
      );
      let content = playlist[currentTrackIndex + 1];

      if (!content) {
        return state;
      }

      return {
        ...state,
        currentTrack: { content },
      };
    }

    case PREVIOUS_TRACK: {
      const playlist = state.isSuffled ? state.mixTracks : state.tracks;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack.content.id
      );
      let content = playlist[currentTrackIndex - 1];

      if (!content) {
        return state;
      }

      return {
        ...state,
        currentTrack: { content },
      };
    }

    case MIX_TRACK: {
      return {
        ...state,
        isMix: !state.isMix,
        mixTracks: [...state.tracks].sort(() => 0.5 - Math.random()),
      };
    }

    default:
      return state;
  }
}
