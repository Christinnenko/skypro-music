import PropTypes from "prop-types";

const OpenFilter = ({
  buttonText,
  listItems,
  isOpen,
  toggleFilter,
  isSelected,
}) => {
  const handleClick = () => {
    toggleFilter();
  };

  return (
    <div
      className={`filter ${isOpen ? "active" : ""} ${
        isSelected ? "filter-active" : ""
      }`}
    >
      <div
        className={`filter__button button-author _btn-text ${
          isOpen && isSelected ? "filter-active-button" : ""
        }`}
        onClick={handleClick}
      >
        {buttonText}
      </div>
      {isOpen && (
        <div className="filter-popup">
          <ul className="filter-popup-scrollable">
            {listItems.map((item, index) => (
              <a href="#" key={index}>
                <li>{item}</li>
              </a>
            ))}
          </ul>
        </div>
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
