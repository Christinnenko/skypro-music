import * as S from "./Search.styles.js";

function Search() {
  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="/icon/sprite.svg#icon-search"></use>
      </S.SearchSvg>
      <S.SearchText type="search" placeholder="Поиск" name="search" />
    </S.CenterblockSearch>
  );
}

export default Search;
