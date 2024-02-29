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

      let filteredPlaylist = [];

      let isFilter = false;

      if (state.isSearch) {
        // Если поиск активен, фильтруем массив searchedPlaylist
        if (action.payload.name === "author") {
          // Фильтруем по автору
          const newAuthorFilter = [
            ...state.FilterCriteria.author,
            action.payload.item,
          ];
          const newFilteredPlaylist = state.searchedPlaylist.filter((track) =>
            newAuthorFilter.includes(track.author)
          );
          return {
            ...state,
            filteredPlaylist: newFilteredPlaylist,
            searchedPlaylist: newFilteredPlaylist,
            FilterCriteria: {
              isActiveAuthor: true,
              author: newAuthorFilter,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
              isFilter: isFilter,
            },
          };
        }

        if (action.payload.name === "genre") {
          // Фильтруем по жанру
          const newGenresFilter = [
            ...state.FilterCriteria.genre,
            action.payload.item,
          ];
          const newFilteredPlaylist = state.searchedPlaylist.filter((track) =>
            newGenresFilter.includes(track.genre)
          );
          return {
            ...state,
            filteredPlaylist: newFilteredPlaylist,
            searchedPlaylist: newFilteredPlaylist,
            FilterCriteria: {
              isActiveGenre: true,
              genre: newGenresFilter,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
              isFilter: isFilter,
            },
          };
        }

        if (action.payload.name === "release_date") {
          let sortButtonText = "По умолчанию";
          if (action.payload.item === "Сначала старые") {
            sortButtonText = "Сначала старые";
            return {
              ...state,
              searchedPlaylist: state.searchedPlaylist
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
            };
          }
          if (action.payload.item === "Сначала новые") {
            sortButtonText = "Сначала новые";
            return {
              ...state,
              searchedPlaylist: state.searchedPlaylist
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
            };
          }
          if (action.payload.item === "По умолчанию") {
            sortButtonText = "По умолчанию";
            return {
              ...state,
              searchedPlaylist: state.searchedPlaylist
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
            };
          }
        }
      } else {
        if (action.payload.name === "author") {
          // для опции, если есть параллельно фильтры по жанру
          const playlistWithGenreFilter = state.initialTracksForFilter.filter(
            (track) => state.FilterCriteria.genre?.includes(track.genre)
          );
          isFilter = true;

          // удаляем фильтр при повторном нажатии
          if (state.FilterCriteria.author?.includes(action.payload.item)) {
            const newAuthorFilter = state.FilterCriteria.author.filter(
              (item) => item !== action.payload.item
            );

            isFilter = false;

            if (newAuthorFilter.length > 0) {
              const newFilteredPlaylist = currentPlaylist.filter((track) =>
                newAuthorFilter.includes(track.author)
              );
              isFilter = true;

              return {
                ...state,
                filteredPlaylist: newFilteredPlaylist,
                FilterCriteria: {
                  isActiveAuthor: true,
                  author: newAuthorFilter,
                  isActiveGenre: state.FilterCriteria.isActiveGenre,
                  genre: state.FilterCriteria.genre,
                  isFilter: isFilter,
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
                isFilter: isFilter,
              },
            };
          }

          const newAuthorFilter = [
            ...state.FilterCriteria.author,
            action.payload.item,
          ];

          const PL =
            state.FilterCriteria.isActiveGenre ||
            state.searchedPlaylist.length > 0
              ? playlistWithGenreFilter
              : state.initialTracksForFilter;

          const newFilteredPlaylist = PL.filter((track) =>
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
              isFilter: isFilter,
            },
          };
        }

        if (action.payload.name === "genre") {
          // для опции, если есть параллельно фильтры по имени
          const playlistWithAuthorFilter = state.initialTracksForFilter.filter(
            (track) => state.FilterCriteria.author?.includes(track.author)
          );
          isFilter = true;

          // удаляем фильтр при повторном нажатии
          if (state.FilterCriteria.genre?.includes(action.payload.item)) {
            const newGenresFilter = state.FilterCriteria.genre.filter(
              (item) => item !== action.payload.item
            );
            isFilter = false;

            if (newGenresFilter.length > 0) {
              const newFilteredPlaylist = currentPlaylist.filter((track) =>
                newGenresFilter.includes(track.genre)
              );
              isFilter = true;

              return {
                ...state,
                filteredPlaylist: newFilteredPlaylist,
                FilterCriteria: {
                  isActiveGenre: true,
                  genre: newGenresFilter,
                  isActiveAuthor: state.FilterCriteria.isActiveAuthor,
                  author: state.FilterCriteria.author,
                  isFilter: isFilter,
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
                isFilter: isFilter,
              },
            };
          }

          const newGenresFilter = [
            ...state.FilterCriteria.genre,
            action.payload.item,
          ];

          const PL =
            state.FilterCriteria.isActiveAuthor ||
            state.searchedPlaylist.length > 0
              ? playlistWithAuthorFilter
              : state.initialTracksForFilter;

          const newFilteredPlaylist = PL.filter((track) =>
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
              isFilter: isFilter,
            },
          };
        }

        if (action.payload.name === "release_date") {
          let sortButtonText = "По умолчанию";
          if (action.payload.item === "Сначала старые") {
            sortButtonText = "Сначала старые";
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
            };
          }
          if (action.payload.item === "Сначала новые") {
            sortButtonText = "Сначала новые";
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
            };
          }
          if (action.payload.item === "По умолчанию") {
            sortButtonText = "По умолчанию";
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
            };
          }
        }
      }

      return {
        ...state,
        filteredPlaylist: filteredPlaylist,
      };
    }

    case SET_SEARCH: {
      const currentPlaylist = action.payload.tracks;
      const searchValue = action.payload.value.trim().toLowerCase();

      let isSearch = false;
      let searchedPlaylist = [];
      let filteredPlaylist = state.filteredPlaylist;

      if (searchValue.length > 0) {
        isSearch = true;

        // Если есть активные фильтры, фильтруем уже отфильтрованный плейлист
        if (state.isFilter) {
          searchedPlaylist = state.filteredPlaylist.filter((track) =>
            track.name.toLowerCase().includes(searchValue)
          );
        } else {
          searchedPlaylist = currentPlaylist.filter((track) =>
            track.name.toLowerCase().includes(searchValue)
          );
        }
      } else {
        if (state.isFilter) {
          // Если строка поиска пустая, но есть активные фильтры, отображаем отфильтрованный плейлист
          searchedPlaylist = state.filteredPlaylist;
        } else {
          // Если и строка поиска и фильтры пусты, отображаем полный плейлист
          searchedPlaylist = currentPlaylist;
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
