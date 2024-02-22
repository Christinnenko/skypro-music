import PropTypes from "prop-types";
import * as S from "./Search.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/actions/creators/creators.js";

function Search({ onChange }) {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.player.searchValue);

  const handleInputChange = (event) => {
    const { value } = event.target;
    dispatch(setSearch(value)); // Отправляем значение поиска в хранилище
    onChange(event); // Вызываем переданную функцию onChange, если это необходимо
  };

  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="/icon/sprite.svg#icon-search"></use>
      </S.SearchSvg>
      <S.SearchText
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchValue}
        onChange={handleInputChange} // Используем обновленный обработчик события
      />
    </S.CenterblockSearch>
  );
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
