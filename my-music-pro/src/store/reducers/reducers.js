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

// 1.
const initialState = {
  currentTrack: null,
  allIds: [],
  isPlaying: null,
  tracks: [],
  pagePlaylist: [],
  isMix: false,
  likedTracks: [],
  isFavorite: false,
  playlist: [],
  searchedPlaylist: [],
  filteredPlaylist: [],
  FilterCriteria: {
    author: [],
    isActiveAuthor: false,
    genre: [],
    isActiveGenre: false,
  },
  initialTracksForFilter: [],
  initialTracksForSearch: [],

  searchValue: "",
  isSearch: false,
  isSort: false,
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
      // Получаем текущий плейлист
      // получаем сохраненный отфильтрованный после поиска плейлист
      let searchedPlaylist = state.searchedPlaylist;
      let genres = [...state.FilterCriteria.genre];
      let authors = [...state.FilterCriteria.author];
      let sortButtonText = action.payload.item;

      let isFilter = false; // Переменная для флага фильтра

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

      if (genres.length) {
        searchedPlaylist = searchedPlaylist.filter((elem) =>
          genres.includes(elem.genre)
        );
        isFilter = true; // Устанавливаем флаг фильтра в true
      }
      if (authors.length) {
        searchedPlaylist = searchedPlaylist.filter((elem) =>
          authors.includes(elem.author)
        );
        isFilter = true; // Устанавливаем флаг фильтра в true
      }

      // Сортировка плейлиста по дате релиза
      if (sortButtonText === "Сначала старые") {
        searchedPlaylist = searchedPlaylist
          .slice()
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        isFilter = true; // Устанавливаем флаг фильтра в true
      }

      if (sortButtonText === "Сначала новые") {
        searchedPlaylist = searchedPlaylist
          .slice()
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        isFilter = true; // Устанавливаем флаг фильтра в true
      }

      if (sortButtonText === "По умолчанию") {
        searchedPlaylist = [...searchedPlaylist];
      }

      return {
        ...state,
        filteredPlaylist: searchedPlaylist,
        FilterCriteria: {
          ...state.FilterCriteria,
          author: authors,
          genre: genres,
        },
        isFilter: isFilter, // Устанавливаем флаг фильтра в состояние
      };
    }

    case SET_SEARCH: {
      const searchValue = action.payload.value.trim().toLowerCase();
      const isFilter = action.isFilter; // Получаем isFilter из действия

      let filteredPlaylist = state.filteredPlaylist;
      let searchedPlaylist; // Объявляем переменную здесь

      if (isFilter) {
        searchedPlaylist = filteredPlaylist.filter((track) =>
          track.name.toLowerCase().includes(searchValue)
        );
      } else {
        const copyFilteredPlaylist = state.initialTracksForFilter;
        searchedPlaylist = copyFilteredPlaylist.filter((track) =>
          track.name.toLowerCase().includes(searchValue)
        );
      }

      return {
        ...state,
        searchedPlaylist: searchedPlaylist,
        filteredPlaylist: searchedPlaylist,
      };
    }

    case CLEAR_FILTERS:
      return {
        ...state,
        FilterCriteria: {
          isActiveGenre: false,
          isActiveAuthor: false,
          isActiveSort: false,
          genre: [],
          author: [],
          sortButtonText: "По умолчанию",
        },
        filteredPlaylist: [],
        isSearch: false,
      };

    default:
      return state;
  }
}
