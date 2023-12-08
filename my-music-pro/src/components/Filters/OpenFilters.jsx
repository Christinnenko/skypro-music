import PropTypes from "prop-types";
import * as S from "./Filters.styles.js";

const OpenFilter = ({ buttonText, listItems, isopen, toggleFilter }) => {
  const handleClick = () => {
    toggleFilter();
  };

  return (
    <div>
      <S.FilterButton isopen={isopen} onClick={handleClick}>
        {buttonText}
      </S.FilterButton>
      {isopen && (
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
};

OpenFilter.propTypes = {
  buttonText: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  isopen: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const OpenFilterSinger = ({
  buttonText,
  listItems,
  isopen,
  toggleFilter,
  isSelected,
}) => (
  <OpenFilter
    buttonText={buttonText}
    listItems={listItems}
    isopen={isopen}
    toggleFilter={toggleFilter}
    isSelected={isSelected}
  />
);

OpenFilterSinger.propTypes = {
  ...OpenFilter.propTypes,
  isSelected: PropTypes.bool,
};

const OpenFilterYears = ({
  buttonText,
  listItems,
  isopen,
  toggleFilter,
  isSelected,
}) => (
  <OpenFilter
    buttonText={buttonText}
    listItems={listItems}
    isopen={isopen}
    toggleFilter={toggleFilter}
    isSelected={isSelected}
  />
);

OpenFilterYears.propTypes = {
  ...OpenFilter.propTypes,
  isSelected: PropTypes.bool,
};

const OpenFilterGenre = ({
  buttonText,
  listItems,
  isopen,
  toggleFilter,
  isSelected,
}) => (
  <OpenFilter
    buttonText={buttonText}
    listItems={listItems}
    isopen={isopen}
    toggleFilter={toggleFilter}
    isSelected={isSelected}
  />
);

OpenFilterGenre.propTypes = {
  ...OpenFilter.propTypes,
  isSelected: PropTypes.bool,
};

export { OpenFilterSinger, OpenFilterYears, OpenFilterGenre };
