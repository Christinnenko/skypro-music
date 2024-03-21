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

      return {
        ...state,
        pagePlaylist: fetchedTracks,
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
      const currentPlaylist = [...state.initialTracksForFilter]; // использовать на всех фильтрах это значение и храним его в первоначальном виде. Автор жанры потом даты

      // Получаем информацию о том, активен ли поиск
      const isSearch = state.isSearch;
      // получаем сохраненный отфильтрованный после поиска плейлист
      const searchedPlaylist = state.copySearchedPlaylist;

      // Если фильтр по жанру
      if (action.payload.name === "genre") {
        // Для опции, если есть параллельно фильтры по автору
        const playlistWithAuthorFilter = state.initialTracksForFilter.filter(
          (track) => state.FilterCriteria.author?.includes(track.author)
        );

        // Удаляем фильтр при повторном нажатии
        if (state.FilterCriteria.genre?.includes(action.payload.item)) {
          // Создаем новый массив жанров без удаленного жанра
          const newGenresFilter = state.FilterCriteria.genre.filter(
            (item) => item !== action.payload.item
          );

          // Если после удаления остались другие жанры
          if (newGenresFilter.length > 0) {
            // Фильтруем отфильтрованный плейлист по новым жанрам
            const newFilteredPlaylist = isSearch
              ? searchedPlaylist.filter((track) =>
                  newGenresFilter.includes(track.genre)
                )
              : currentPlaylist.filter((track) =>
                  newGenresFilter.includes(track.genre)
                );

            return {
              ...state,
              filteredPlaylist: newFilteredPlaylist,
              copyFilteredPlaylist: newFilteredPlaylist,
              FilterCriteria: {
                isActiveGenre: true,
                genre: newGenresFilter,
                isActiveAuthor: state.FilterCriteria.isActiveAuthor,
                author: state.FilterCriteria.author,
              },
            };
          }

          // Если больше нет других жанров, сбрасываем фильтр по жанру
          return {
            ...state,
            filteredPlaylist: isSearch
              ? searchedPlaylist.filter((track) =>
                  track.author.includes(state.FilterCriteria.author)
                )
              : currentPlaylist.filter((track) =>
                  track.author.includes(state.FilterCriteria.author)
                ),
            copyFilteredPlaylist: isSearch
              ? searchedPlaylist.filter((track) =>
                  track.author.includes(state.FilterCriteria.author)
                )
              : currentPlaylist.filter((track) =>
                  track.author.includes(state.FilterCriteria.author)
                ),
            FilterCriteria: {
              isActiveGenre: false,
              genre: newGenresFilter,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
            },
          };
        }

        // Добавляем выбранный жанр в список фильтров
        const newGenresFilter = [
          ...state.FilterCriteria.genre,
          action.payload.item,
        ];

        // Выбираем изначальный плейлист в зависимости от активности фильтра по автору
        const PL = state.FilterCriteria.isActiveAuthor
          ? playlistWithAuthorFilter
          : state.initialTracksForFilter;

        // Фильтруем плейлист в зависимости от активности поиска
        const newFilteredPlaylist = isSearch
          ? searchedPlaylist.filter((track) =>
              newGenresFilter.includes(track.genre)
            )
          : PL.filter((track) => newGenresFilter.includes(track.genre));

        return {
          ...state,
          filteredPlaylist: newFilteredPlaylist,
          copyFilteredPlaylist: newFilteredPlaylist,
          FilterCriteria: {
            isActiveGenre: true,
            genre: newGenresFilter,
            isActiveAuthor: state.FilterCriteria.isActiveAuthor,
            author: state.FilterCriteria.author,
          },
        };
      }

      // Если фильтр по автору
      if (action.payload.name === "author") {
        // Для опции, если есть параллельно фильтры по жанру
        const playlistWithGenreFilter = state.initialTracksForFilter.filter(
          (track) => state.FilterCriteria.genre?.includes(track.genre)
        );

        // Удаляем фильтр при повторном нажатии
        if (state.FilterCriteria.author?.includes(action.payload.item)) {
          // Создаем новый массив авторов без удаленного автора
          const newAuthorFilter = state.FilterCriteria.author.filter(
            (item) => item !== action.payload.item
          );

          // Если после удаления остались другие авторы
          if (newAuthorFilter.length > 0) {
            // Фильтруем отфильтрованный плейлист по новым авторам
            const newFilteredPlaylist = isSearch
              ? searchedPlaylist.filter((track) =>
                  newAuthorFilter.includes(track.author)
                )
              : currentPlaylist.filter((track) =>
                  newAuthorFilter.includes(track.author)
                );

            return {
              ...state,
              filteredPlaylist: newFilteredPlaylist,
              copyFilteredPlaylist: newFilteredPlaylist,
              FilterCriteria: {
                isActiveAuthor: true,
                author: newAuthorFilter,
                isActiveGenre: state.FilterCriteria.isActiveGenre,
                genre: state.FilterCriteria.genre,
              },
            };
          }

          // Если больше нет других авторов, сбрасываем фильтр по автору
          return {
            ...state,
            filteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort((a, b) => new Date(a.id) - new Date(b.id))
              : currentPlaylist
                  .slice()
                  .sort((a, b) => new Date(a.id) - new Date(b.id)),
            copyFilteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort((a, b) => new Date(a.id) - new Date(b.id))
              : currentPlaylist
                  .slice()
                  .sort((a, b) => new Date(a.id) - new Date(b.id)),
            FilterCriteria: {
              isActiveAuthor: false,
              author: newAuthorFilter,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
            },
          };
        }

        // Добавляем выбранного автора в список фильтров
        const newAuthorFilter = [
          ...state.FilterCriteria.author,
          action.payload.item,
        ];

        // Выбираем плейлист в зависимости от активности поиска и фильтра по жанру
        const PL = state.FilterCriteria.isActiveGenre
          ? playlistWithGenreFilter
          : state.initialTracksForFilter;

        // Фильтруем плейлист по выбранному автору
        const newFilteredPlaylist = isSearch
          ? searchedPlaylist.filter((track) =>
              newAuthorFilter.includes(track.author)
            )
          : PL.filter((track) => newAuthorFilter.includes(track.author));

        return {
          ...state,
          filteredPlaylist: newFilteredPlaylist,
          copyFilteredPlaylist: newFilteredPlaylist,
          FilterCriteria: {
            isActiveAuthor: true,
            author: newAuthorFilter,
            isActiveGenre: state.FilterCriteria.isActiveGenre,
            genre: state.FilterCriteria.genre,
          },
        };
      }

      // Если фильтр по дате релиза
      if (action.payload.name === "release_date") {
        let sortButtonText = "По умолчанию";
        let isSort = false;

        // Сортировка плейлиста по дате релиза
        if (action.payload.item === "Сначала старые") {
          sortButtonText = "Сначала старые";
          isSort = true;
          return {
            ...state,
            filteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(a.release_date) - new Date(b.release_date)
                  )
              : currentPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(a.release_date) - new Date(b.release_date)
                  ),
            copyFilteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(a.release_date) - new Date(b.release_date)
                  )
              : currentPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(a.release_date) - new Date(b.release_date)
                  ),
            FilterCriteria: {
              isActiveSort: true,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
              sortButtonText: sortButtonText,
            },
            isSort: isSort,
          };
        }
        if (action.payload.item === "Сначала новые") {
          sortButtonText = "Сначала новые";
          isSort = true;
          return {
            ...state,
            filteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.release_date) - new Date(a.release_date)
                  )
              : currentPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.release_date) - new Date(a.release_date)
                  ),
            copyFilteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.release_date) - new Date(a.release_date)
                  )
              : currentPlaylist
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.release_date) - new Date(a.release_date)
                  ),
            FilterCriteria: {
              isActiveSort: true,
              isActiveAuthor: state.FilterCriteria.isActiveAuthor,
              author: state.FilterCriteria.author,
              isActiveGenre: state.FilterCriteria.isActiveGenre,
              genre: state.FilterCriteria.genre,
              sortButtonText: sortButtonText,
            },
            isSort: isSort,
          };
        }
        if (action.payload.item === "По умолчанию") {
          sortButtonText = "По умолчанию";
          isSort = false;
          return {
            ...state,
            filteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort((a, b) => new Date(a.id) - new Date(b.id))
              : currentPlaylist
                  .slice()
                  .sort((a, b) => new Date(a.id) - new Date(b.id)),
            copyFilteredPlaylist: isSearch
              ? searchedPlaylist
                  .slice()
                  .sort((a, b) => new Date(a.id) - new Date(b.id))
              : currentPlaylist
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
            isSort: isSort,
          };
        }
      }

      // Если фильтр не указан, возвращаем оригинальный отфильтрованный плейлист
      return {
        ...state,
        filteredPlaylist: [],
        copyFilteredPlaylist: [],
      };
    }

    case SET_SEARCH: {
      const currentPlaylist = action.payload.tracks; // Получаем текущий плейлист
      const pagePlaylist = state.pagePlaylist;
      const searchValue = action.payload.value.trim().toLowerCase(); // Получаем значение строки поиска и приводим его к нижнему регистру
      const copyFilteredPlaylist = state.copyFilteredPlaylist;

      let isSearch = false;
      let searchedPlaylist = [];

      if (searchValue.length > 0) {
        isSearch = true;

        // Фильтруем текущий плейлист по строке поиска
        searchedPlaylist = currentPlaylist.filter((track) =>
          track.name.toLowerCase().includes(searchValue)
        );

        // Если есть активные фильтры, фильтруем отфильтрованный плейлист
        if (
          state.FilterCriteria.isActiveAuthor ||
          state.FilterCriteria.isActiveGenre
        ) {
          searchedPlaylist = copyFilteredPlaylist.filter((track) =>
            track.name.toLowerCase().includes(searchValue)
          );
        }
      } else {
        // Если строка поиска пустая, но есть активные фильтры, отображаем отфильтрованный плейлист
        if (
          state.FilterCriteria.isActiveAuthor ||
          state.FilterCriteria.isActiveGenre
        ) {
          searchedPlaylist = copyFilteredPlaylist;
        }

        // Добавляем условие для isSort
        if (state.isSort) {
          // В зависимости от выбранной сортировки изменяем порядок плейлиста
          if (state.FilterCriteria.sortButtonText === "Сначала старые") {
            searchedPlaylist = pagePlaylist
              .slice()
              .sort(
                (a, b) => new Date(a.release_date) - new Date(b.release_date)
              );
          } else if (state.FilterCriteria.sortButtonText === "Сначала новые") {
            searchedPlaylist = pagePlaylist
              .slice()
              .sort(
                (a, b) => new Date(b.release_date) - new Date(a.release_date)
              );
          } else {
            // По умолчанию сортируем по id
            searchedPlaylist = pagePlaylist
              .slice()
              .sort((a, b) => new Date(a.id) - new Date(b.id));
          }
        }
      }

      return {
        ...state,
        filteredPlaylist: searchedPlaylist, // Обновляем отфильтрованный плейлист
        copySearchedPlaylist: [...searchedPlaylist], // Сохраняем копию отфильтрованного плейлиста после поиска
        searchValue: action.payload.value, // Устанавливаем значение строки поиска
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
        filteredPlaylist: [],
        isSearch: false,
      };

    default:
      return state;
  }
}
