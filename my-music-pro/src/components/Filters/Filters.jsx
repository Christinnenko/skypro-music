import { useState } from "react";
import {
  OpenFilterSinger,
  OpenFilterYears,
  OpenFilterGenre,
} from "./OpenFilters";
import "./Filters.css";

function Filters() {
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filter) => {
    setOpenFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>
      <OpenFilterSinger
        buttonText="исполнителю"
        listItems={[
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
        ]}
        isOpen={openFilter === "исполнителю"}
        toggleFilter={() => toggleFilter("исполнителю")}
        isSelected={true}
      />
      <OpenFilterYears
        buttonText="году выпуска"
        listItems={["1992", "1993", "1994", "1995"]}
        isOpen={openFilter === "году выпуска"}
        toggleFilter={() => toggleFilter("году выпуска")}
        isSelected={true}
      />
      <OpenFilterGenre
        buttonText="жанру"
        listItems={[
          "Рок",
          "Хип-хоп",
          "Поп-музыка",
          "Техно",
          "Инди",
          "Метал",
          "Классическая музыка",
        ]}
        isOpen={openFilter === "жанру"}
        toggleFilter={() => toggleFilter("жанру")}
        isSelected={true}
      />
    </div>
  );
}

export default Filters;
