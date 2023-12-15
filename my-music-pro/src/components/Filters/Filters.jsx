import { useState } from "react";
import * as S from "./Filters.styles.js";
import PropTypes from "prop-types";

const Filter = ({ buttonText, listItems, isOpen, toggleFilter }) => (
  <div>
    <S.FilterButton $isOpen={isOpen} onClick={toggleFilter}>
      {buttonText}
    </S.FilterButton>
    {isOpen && (
      <S.FilterPopup>
        <S.FilterPopupScrollable>
          {listItems.map((item, index) => (
            <div key={index}>{item}</div>
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
  toggleFilter: PropTypes.func.isRequired,
};

function Filters() {
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filter) => {
    setOpenFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const filterData = [
    {
      buttonText: "исполнителю",
      listItems: [
        "Nero",
        "Dynoro, Outwork, Mr. Gee",
        "Ali Bakgor",
        "Стоункат, Psychopath",
        "Jaded, Will Clarke, AR/CO",
        "Blue Foundation, Zeds Dead",
        "HYBIT, Mr. Black, Offer Nissim, Hi Profile",
        "minthaze",
        "Calvin Harris, Disciples",
        "Tom Boxer",
        "Calvin Harris, Disciples",
      ],
      isOpen: openFilter === "исполнителю",
      toggleFilter: () => toggleFilter("исполнителю"),
      isSelected: true,
    },
    {
      buttonText: "году выпуска",
      listItems: ["1992", "1993", "1994", "1995"],
      isOpen: openFilter === "году выпуска",
      toggleFilter: () => toggleFilter("году выпуска"),
      isSelected: true,
    },
    {
      buttonText: "жанру",
      listItems: [
        "Рок",
        "Хип-хоп",
        "Поп-музыка",
        "Техно",
        "Инди",
        "Метал",
        "Классическая музыка",
      ],
      isOpen: openFilter === "жанру",
      toggleFilter: () => toggleFilter("жанру"),
      isSelected: true,
    },
  ];

  return (
    <S.CenterblockFilter>
      <S.FilterTitle>Искать по:</S.FilterTitle>
      {filterData.map((filter, index) => (
        <Filter key={index} {...filter} />
      ))}
    </S.CenterblockFilter>
  );
}

export default Filters;
