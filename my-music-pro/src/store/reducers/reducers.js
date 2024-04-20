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
} from "../actions/types/types";

const initialState = {
  currentTrack: null,
  isPlaying: null,
  tracks: [],
  pagePlaylist: [],
  isMix: false,
  playlist: [],
  filteredPlaylist: [],
  FilterCriteria: {
    author: [],
    genre: [],
  },
  initialTracksForFilter: [],
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_TRACK: {
      const { track, playlist } = action.payload;

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
      return {
        ...state,

        isMix: isMixValue ? isMixValue : !state.isMix,
        mixTracks: [...state.tracks].sort(() => 0.5 - Math.random()),
      };
    }

    case SET_PAGE_PLAYLIST: {
      const { fetchedTracks } = action.payload;
      const currentUser = JSON.parse(localStorage.getItem("user"));

      const playlistWithLikes = fetchedTracks.map((el) => {
        let isFavorite = false;
        if (el.stared_user) {
          isFavorite = el.stared_user.some(
            (user) => user.id === currentUser.id
          );
        }

        return { ...el, isFavorite };
      });
      return {
        ...state,
        pagePlaylist: playlistWithLikes,
      };
    }

    case TOGGLE_LIKE: {
      const { trackId } = action.payload;

      const updatedPagePlaylist = state.pagePlaylist.map((track) =>
        track.id === trackId
          ? { ...track, isFavorite: !track.isFavorite }
          : track
      );

      const updatedFilteredPlaylist = state.filteredPlaylist.map((track) =>
        track.id === trackId
          ? { ...track, isFavorite: !track.isFavorite }
          : track
      );

      return {
        ...state,
        pagePlaylist: updatedPagePlaylist,
        filteredPlaylist: updatedFilteredPlaylist,
      };
    }

    case SET_INITIAL_TRACKS: {
      return {
        ...state,
        initialTracksForFilter: action.payload.data,
      };
    }

    case SET_FILTER: {
      let genres = [...state.FilterCriteria.genre];
      let authors = [...state.FilterCriteria.author];
      let sortButtonText = action.payload.item;

      // Если фильтр по жанру
      if (action.payload.name === "author") {
        if (state.FilterCriteria.author.includes(action.payload.item)) {
          authors = authors.filter((elem) => elem !== action.payload.item);
        } else {
          authors.push(action.payload.item);
        }
      }
      if (action.payload.name === "genre") {
        if (state.FilterCriteria.genre.includes(action.payload.item)) {
          genres = genres.filter((elem) => elem !== action.payload.item);
        } else {
          genres.push(action.payload.item);
        }
      }

      return {
        ...state,
        FilterCriteria: {
          ...state.FilterCriteria,
          author: authors,
          genre: genres,
          sortButtonText,
        },
      };
    }

    case SET_SEARCH: {
      const searchValue = action.payload.value.trim().toLowerCase();
      let searchedPlaylist;

      const copyFilteredPlaylist = state.initialTracksForFilter;
      searchedPlaylist = copyFilteredPlaylist.filter((track) =>
        track.name.toLowerCase().includes(searchValue)
      );

      return {
        ...state,
        filteredPlaylist: searchedPlaylist,
      };
    }

    case CLEAR_FILTERS:
      return {
        ...state,
        FilterCriteria: {
          genre: [],
          author: [],
          sortButtonText: "По умолчанию",
        },
        filteredPlaylist: [],
      };

    default:
      return state;
  }
}
