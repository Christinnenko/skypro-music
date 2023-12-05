import PropTypes from "prop-types";
import * as S from "./Filters.styles.js";

const OpenFilter = ({ buttonText, listItems, isOpen, toggleFilter }) => {
  const handleClick = () => {
    toggleFilter();
  };

  return (
    <div>
      <S.FilterButton isOpen={isOpen} onClick={handleClick}>
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
};

OpenFilter.propTypes = {
  buttonText: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const OpenFilterSinger = ({
  buttonText,
  listItems,
  isOpen,
  toggleFilter,
  isSelected,
}) => (
  <OpenFilter
    buttonText={buttonText}
    listItems={listItems}
    isOpen={isOpen}
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
  isOpen,
  toggleFilter,
  isSelected,
}) => (
  <OpenFilter
    buttonText={buttonText}
    listItems={listItems}
    isOpen={isOpen}
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
  isOpen,
  toggleFilter,
  isSelected,
}) => (
  <OpenFilter
    buttonText={buttonText}
    listItems={listItems}
    isOpen={isOpen}
    toggleFilter={toggleFilter}
    isSelected={isSelected}
  />
);

OpenFilterGenre.propTypes = {
  ...OpenFilter.propTypes,
  isSelected: PropTypes.bool,
};

export { OpenFilterSinger, OpenFilterYears, OpenFilterGenre };
