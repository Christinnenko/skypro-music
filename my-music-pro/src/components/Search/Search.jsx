import { useDispatch } from "react-redux";
import * as S from "./Search.styles.js";
import { setSearchQuery } from "../../store/actions/creators/creators.js";

function Search() {
  const dispatch = useDispatch();
  const handleSearchChange = (event) => {
    const query = event.target.value;
    console.log("Search Query Change:", query);
    dispatch(setSearchQuery(query));
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
        onChange={handleSearchChange}
      />
    </S.CenterblockSearch>
  );
}

export default Search;
