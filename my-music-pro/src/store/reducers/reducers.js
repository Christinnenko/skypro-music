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
  searchedPlaylist: [],
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
      console.log(isMixValue);
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
      console.log("rfrv", fetchedTracks);
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
        currentTrack:
          state.currentTrack && state.currentTrack.id === trackId
            ? {
                ...state.currentTrack,
                isFavorite: !state.currentTrack.isFavorite,
              }
            : state.currentTrack,
      };
    }

    case SET_INITIAL_TRACKS: {
      return {
        ...state,
        initialTracksForFilter: action.payload.data,
      };
    }

    case SET_FILTER: {
      const currentPlaylist = action.payload.tracks;
      const searchedPlaylist = state.searchedPlaylist;
      if (action.payload.name === "genre") {
        // для опции, если есть параллельно фильтры по имени
        const playlistWithAuthorFilter = state.initialTracksForFilter.filter(
          (track) => state.FilterCriteria.author?.includes(track.author)
        );

        // удаляем фильтр при повторном нажатии
        if (state.FilterCriteria.genre?.includes(action.payload.item)) {
          const newGenresFilter = state.FilterCriteria.genre.filter(
            (item) => item !== action.payload.item
          );

          if (newGenresFilter.length > 0) {
            const newFilteredPlaylist = state.isSearch
              ? searchedPlaylist.filter((track) =>
                  newGenresFilter.includes(track.genre)
                )
              : currentPlaylist.filter((track) =>
                  newGenresFilter.includes(track.genre)
                );

            return {
              ...state,
              filteredPlaylist: newFilteredPlaylist,
              FilterCriteria: {
                isActiveGenre: true,
                genre: newGenresFilter,
                isActiveAuthor: state.FilterCriteria.isActiveAuthor,
                author: state.FilterCriteria.author,
              },
            };
          }

          return {
            ...state,
            filteredPlaylist: state.FilterCriteria.isActiveAuthor
              ? playlistWithAuthorFilter
              : state.initialTracksForFilter,
            FilterCriteria: {
              isActiveGenre: false,
              genre: newGenresFilter,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
            },
          };
        }

        const newGenresFilter = [
          ...state.FilterCriteria.genre,
          action.payload.item,
        ];

        const PL = state.FilterCriteria.isActiveAuthor
          ? playlistWithAuthorFilter
          : state.initialTracksForFilter;

        const newFilteredPlaylist = state.isSearch
          ? searchedPlaylist.filter((track) =>
              newGenresFilter.includes(track.genre)
            )
          : PL.filter((track) => newGenresFilter.includes(track.genre));

        return {
          ...state,
          filteredPlaylist: newFilteredPlaylist,
          FilterCriteria: {
            isActiveGenre: true,
            genre: newGenresFilter,
            isActiveAuthor: state.FilterCriteria.isActiveAuthor,
            author: state.FilterCriteria.author,
          },
        };
      }

      if (action.payload.name === "author") {
        // для опции, если есть параллельно фильтры по жанру
        const playlistWithGenreFilter = state.initialTracksForFilter.filter(
          (track) => state.FilterCriteria.genre?.includes(track.genre)
        );

        // удаляем фильтр при повторном нажатии
        if (state.FilterCriteria.author?.includes(action.payload.item)) {
          const newAuthorFilter = state.FilterCriteria.author.filter(
            (item) => item !== action.payload.item
          );

          if (newAuthorFilter.length > 0) {
            const newFilteredPlaylist = state.isSearch
              ? searchedPlaylist.filter((track) =>
                  newAuthorFilter.includes(track.author)
                )
              : currentPlaylist.filter((track) =>
                  newAuthorFilter.includes(track.author)
                );

            return {
              ...state,
              filteredPlaylist: newFilteredPlaylist,
              FilterCriteria: {
                isActiveAuthor: true,
                author: newAuthorFilter,
                isActiveGenre: state.FilterCriteria.isActiveGenre,
                genre: state.FilterCriteria.genre,
              },
            };
          }

          return {
            ...state,
            filteredPlaylist: state.FilterCriteria.isActiveGenre
              ? playlistWithGenreFilter
              : state.initialTracksForFilter,

            FilterCriteria: {
              isActiveAuthor: false,
              author: newAuthorFilter,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
            },
          };
        }

        const newAuthorFilter = [
          ...state.FilterCriteria.author,
          action.payload.item,
        ];

        const PL = state.FilterCriteria.isActiveGenre
          ? playlistWithGenreFilter
          : state.initialTracksForFilter;

        const newFilteredPlaylist = state.isSearch
          ? searchedPlaylist.filter((track) =>
              newAuthorFilter.includes(track.author)
            )
          : PL.filter((track) => newAuthorFilter.includes(track.author));

        return {
          ...state,
          filteredPlaylist: newFilteredPlaylist,

          FilterCriteria: {
            isActiveAuthor: true,
            author: newAuthorFilter,
            isActiveGenre: state.FilterCriteria.isActiveGenre,
            genre: state.FilterCriteria.genre,
          },
        };
      }

      if (action.payload.name === "release_date") {
        let sortButtonText = "По умолчанию";
        let isSort = false; // Добавляем флаг isSort

        if (action.payload.item === "Сначала старые") {
          sortButtonText = "Сначала старые";
          isSort = true; // Устанавливаем флаг isSort в true
          return {
            ...state,
            filteredPlaylist: currentPlaylist
              .slice()
              .sort(
                (a, b) => new Date(a.release_date) - new Date(b.release_date)
              ),
            FilterCriteria: {
              isActiveSort: true,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
              sortButtonText: sortButtonText,
            },
            isSort: isSort, // Устанавливаем флаг isSort в state
          };
        }
        if (action.payload.item === "Сначала новые") {
          sortButtonText = "Сначала новые";
          isSort = true; // Устанавливаем флаг isSort в true
          return {
            ...state,
            filteredPlaylist: currentPlaylist
              .slice()
              .sort(
                (a, b) => new Date(b.release_date) - new Date(a.release_date)
              ),
            FilterCriteria: {
              isActiveSort: true,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
              sortButtonText: sortButtonText,
            },
            isSort: isSort, // Устанавливаем флаг isSort в state
          };
        }
        if (action.payload.item === "По умолчанию") {
          sortButtonText = "По умолчанию";
          isSort = false; // Устанавливаем флаг isSort в false
          return {
            ...state,
            filteredPlaylist: currentPlaylist
              .slice()
              .sort((a, b) => new Date(a.id) - new Date(b.id)),
            FilterCriteria: {
              isActiveSort: false,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
              sortButtonText: sortButtonText,
            },
            isSort: isSort, // Устанавливаем флаг isSort в state
          };
        }
      }

      return {
        ...state,
        filteredPlaylist: [],
      };
    }

    case SET_SEARCH: {
      const currentPlaylist = action.payload.tracks;
      const searchValue = action.payload.value.trim().toLowerCase();

      let isSearch = false;
      let searchedPlaylist = [];
      let filteredPlaylist = state.filteredPlaylist; // Используем filteredPlaylist из состояния по умолчанию

      if (searchValue.length > 0) {
        isSearch = true;

        // Фильтруем текущий плейлист по строке поиска
        searchedPlaylist = currentPlaylist.filter((track) =>
          track.name.toLowerCase().includes(searchValue)
        );

        // Если есть активные фильтры, фильтруем также отфильтрованный плейлист
        if (
          state.FilterCriteria.isActiveAuthor ||
          state.FilterCriteria.isActiveGenre
        ) {
          filteredPlaylist = state.filteredPlaylist.filter((track) =>
            track.name.toLowerCase().includes(searchValue)
          );
        }
      } else {
        // Если строка поиска пустая, но есть активные фильтры, отображаем отфильтрованный плейлист
        if (
          state.FilterCriteria.isActiveAuthor ||
          state.FilterCriteria.isActiveGenre
        ) {
          filteredPlaylist = state.filteredPlaylist;
        }
      }

      return {
        ...state,
        searchedPlaylist: searchedPlaylist,
        filteredPlaylist: filteredPlaylist,

        searchValue: action.payload.value,
        isSearch: isSearch,
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
        filteredPlaylist: state.initialTracksForFilter,

        searchedPlaylist: [],
        isSearch: false,
      };

    default:
      return state;
  }
}
