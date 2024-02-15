import { useState } from "react";
import * as S from "./Filters.styles.js";
import PropTypes from "prop-types";

const Filter = ({
  buttonText,
  listItems,
  isOpen,
  toggleFilter,
  selectedValues,
  onItemClick,
}) => (
  <div>
    <S.FilterButton $isOpen={isOpen} onClick={toggleFilter}>
      {buttonText}
      {selectedValues.length > 0 && (
        <S.SelectedCount>{selectedValues.length}</S.SelectedCount>
      )}
    </S.FilterButton>
    {isOpen && (
      <S.FilterPopup>
        <S.FilterPopupScrollable>
          {listItems.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={selectedValues.includes(item) ? "selected" : ""}
              onClick={() => onItemClick(item)}
            >
              {item}
            </div>
          ))}
        </S.FilterPopupScrollable>
      </S.FilterPopup>
    )}
  </div>
);

Filter.propTypes = {
  buttonText: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFilter: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const Sorter = ({
  buttonText,
  listItems,
  isOpen,
  toggleFilter,
  selectedValues,
  onItemClick,
}) => (
  <div>
    <S.FilterButton $isOpen={isOpen} onClick={toggleFilter}>
      {buttonText}
      {selectedValues.length > 0 && (
        <S.SelectedCount>{selectedValues.length}</S.SelectedCount>
      )}
    </S.FilterButton>
    {isOpen && (
      <S.FilterPopup>
        <S.FilterPopupScrollable>
          {listItems.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={
                selectedValues.includes(item) || item === "По умолчанию"
                  ? "selected"
                  : ""
              }
              onClick={() => onItemClick(item)}
            >
              {item}
            </div>
          ))}
        </S.FilterPopupScrollable>
      </S.FilterPopup>
    )}
  </div>
);

Sorter.propTypes = {
  buttonText: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFilter: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

function Filters({ tracks }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSorter, setOpenSorter] = useState(null);
  const [filterStates, setFilterStates] = useState([]);
  const [sorterStates, setSorterStates] = useState([]);
  const [selectedSort, setSelectedSort] = useState("По умолчанию"); //текст на кнопке

  const filterData = [
    {
      buttonText: "исполнителю",
      listItems: Array.from(
        new Set(tracks.map((track) => track.author))
      ).sort(),
    },
    {
      buttonText: "жанру",
      listItems: Array.from(new Set(tracks.map((track) => track.genre))).sort(),
    },
  ];

  const sortData = [
    {
      buttonText: "По умолчанию",
      listItems: ["По умолчанию", "Сначала старые", "Сначала новые"],
    },
  ];

  const toggleFilter = (index, isSorter) => {
    if (isSorter) {
      setOpenSorter((prevFilter) => (prevFilter === index ? null : index));
      setOpenFilter(null);
    } else {
      setOpenFilter((prevFilter) => (prevFilter === index ? null : index));
      setOpenSorter(null);
    }
  };

  const handleItemClick = (index, item, isSorter) => {
    if (isSorter) {
      setSorterStates((prevStates) => {
        let updatedItems;

        if (item === "По умолчанию") {
          updatedItems = [];
        } else {
          updatedItems = [item];
        }

        setSelectedSort(updatedItems[0] || "По умолчанию");

        return {
          ...prevStates,
          [index]: updatedItems,
        };
      });
    } else {
      setFilterStates((prevStates) => {
        const prevItems = prevStates[index] || [];
        const updatedItems = prevItems.includes(item)
          ? prevItems.filter((prevItem) => prevItem !== item)
          : [...prevItems, item];

        return {
          ...prevStates,
          [index]: updatedItems,
        };
      });
    }
  };

  return (
    <S.CenterblockFilter>
      <S.FilterBlock>
        <S.FilterTitle>Искать по:</S.FilterTitle>
        {filterData.map((filter, index) => (
          <Filter
            key={index}
            buttonText={filter.buttonText}
            listItems={filter.listItems}
            isOpen={openFilter === index}
            selectedValues={filterStates[index] || []}
            toggleFilter={() => toggleFilter(index, false)}
            onItemClick={(item) => handleItemClick(index, item, false)}
          />
        ))}
      </S.FilterBlock>
      <S.FilterBlock>
        <S.FilterTitle>Сортировка:</S.FilterTitle>
        {sortData.map((filter, index) => (
          <Sorter
            key={index}
            buttonText={selectedSort}
            listItems={filter.listItems}
            isOpen={openSorter === index}
            selectedValues={sorterStates[index] || []}
            toggleFilter={() => toggleFilter(index, true)}
            onItemClick={(item) => handleItemClick(index, item, true)}
          />
        ))}
      </S.FilterBlock>
    </S.CenterblockFilter>
  );
}

Filters.propTypes = {
  tracks: PropTypes.array.isRequired,
};

export default Filters;
