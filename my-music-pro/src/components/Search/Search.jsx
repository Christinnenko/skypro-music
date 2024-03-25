import * as S from "./Search.styles.js";
import { useDispatch } from "react-redux";
import { setSearch } from "../../store/actions/creators/creators.js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Search() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(setSearch({ value: searchText }));
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    dispatch(setSearch({ value: value }));
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
        value={searchText}
        onChange={handleChange}
      />
    </S.CenterblockSearch>
  );
}

Search.propTypes = {
  tracks: PropTypes.array.isRequired,
};

export default Search;
