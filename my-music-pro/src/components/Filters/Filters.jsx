import { useEffect, useState } from "react";
import * as S from "./Filters.styles.js";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setInitialTracksForFilter,
} from "../../store/actions/creators/creators.js";

const Filter = ({
  type,
  filterName,
  filterOptions,
  tracks,
  isActive,
  onShow,
  onHide,
}) => {
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleFilter = ({ item, name }) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    setIsFilter(!isFilter);
    dispatch(setFilter({ item, name, tracks }));
  };

  const sortedOptions = filterOptions.slice().sort();

  return (
    <div>
      <S.FilterButton $isActive={isActive} onClick={isActive ? onHide : onShow}>
        {type}
        {selectedItems.length > 0 && (
          <S.SelectedCount count={selectedItems.length}>
            {selectedItems.length}
          </S.SelectedCount>
        )}
      </S.FilterButton>
      {isActive && (
        <S.FilterPopup>
          <S.FilterPopupScrollable>
            {sortedOptions.map((item, index) => (
              <div
                key={index}
                className={selectedItems.includes(item) ? "selected" : ""}
                onClick={() => toggleFilter({ item, name: filterName, tracks })}
              >
                {item}
              </div>
            ))}
          </S.FilterPopupScrollable>
        </S.FilterPopup>
      )}
    </div>
  );
};

Filter.propTypes = {
  type: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  tracks: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

const Sorter = ({
  filterName,
  filterOptions,
  tracks,
  isActive,
  onShow,
  onHide,
}) => {
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleFilter = ({ item, name }) => {
    // Если выбран уже выбранный элемент, снимаем его выбор
    const newSelectedItem = selectedItem === item ? "" : item;
    setSelectedItem(newSelectedItem);
    setIsFilter(!isFilter);
    dispatch(
      setFilter({ item: newSelectedItem || "По умолчанию", name, tracks })
    );
  };

  useEffect(() => {
    // Если ни один элемент не выбран, установите "По умолчанию"
    if (!selectedItem) {
      setSelectedItem("По умолчанию");
    }
  }, [selectedItem]);

  const sortedOptions = filterOptions.slice().sort();
  const buttonText = selectedItem || "По умолчанию";
  const showCounter = selectedItem && selectedItem !== "По умолчанию";

  return (
    <div>
      <S.FilterButton $isActive={isActive} onClick={isActive ? onHide : onShow}>
        {buttonText}
        {showCounter && (
          <S.SelectedCount>{selectedItem ? 1 : 0}</S.SelectedCount>
        )}
      </S.FilterButton>
      {isActive && (
        <S.FilterPopup>
          <S.FilterPopupScrollable>
            {sortedOptions.map((item, index) => (
              <div
                key={index}
                className={selectedItem === item ? "selected" : ""}
                onClick={() => toggleFilter({ item, name: filterName, tracks })}
              >
                {item}
              </div>
            ))}
          </S.FilterPopupScrollable>
        </S.FilterPopup>
      )}
    </div>
  );
};

Sorter.propTypes = {
  sortButtonText: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  tracks: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

const Filters = ({ tracks }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();

  const filteredTrackList = useSelector(
    (store) => store.player.filteredPlaylist
  );
  const initialTracksForFilter = useSelector(
    (store) => store.player.initialTracksForFilter
  );
  const filteredByGenre = useSelector(
    (store) => store.player.FilterCriteria.isActiveGenre
  );
  const filteredByAuthor = useSelector(
    (store) => store.player.FilterCriteria.isActiveAuthor
  );
  const isSorted = useSelector(
    (store) => store.player.FilterCriteria.isActiveSort
  );
  const sortButtonText = useSelector(
    (store) => store.player.FilterCriteria.sortButtonText
  );

  const pagePlaylist = useSelector((state) => state.player.pagePlaylist);

  const genres = [...new Set(pagePlaylist.map((track) => track.genre))];
  const author = [...new Set(pagePlaylist.map((track) => track.author))];
  const years = ["По умолчанию", "Сначала новые", "Сначала старые"];

  useEffect(() => {
    if (tracks) {
      dispatch(setInitialTracksForFilter({ tracks }));
    }
  }, []);

  const filteredData =
    filteredByGenre || filteredByAuthor || isSorted
      ? filteredTrackList
      : initialTracksForFilter;

  return (
    <S.CenterblockFilter>
      <S.FilterBlock>
        <S.FilterTitle>Искать по:</S.FilterTitle>
        <Filter
          type="исполнителю"
          filterName="author"
          filterOptions={author}
          tracks={filteredData}
          isActive={activeIndex === 1}
          onShow={() => setActiveIndex(1)}
          onHide={() => setActiveIndex(0)}
        />
        <Filter
          type="жанру"
          filterName="genre"
          filterOptions={genres}
          tracks={filteredData}
          isActive={activeIndex === 3}
          onShow={() => setActiveIndex(3)}
          onHide={() => setActiveIndex(0)}
        />
      </S.FilterBlock>
      <S.FilterBlock>
        <S.FilterTitle>Сортировка:</S.FilterTitle>
        <Sorter
          sortButtonText={sortButtonText}
          filterName="release_date"
          filterOptions={years}
          tracks={filteredData}
          isActive={activeIndex === 2}
          onShow={() => setActiveIndex(2)}
          onHide={() => setActiveIndex(0)}
        />
      </S.FilterBlock>
    </S.CenterblockFilter>
  );
};

Filters.propTypes = {
  tracks: PropTypes.array.isRequired,
};

export default Filters;
