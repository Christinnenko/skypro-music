import * as S from "./Search.styles.js";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/actions/creators/creators.js";

function Search() {
  const dispatch = useDispatch();
  const pagePlaylist = useSelector((state) => state.player.pagePlaylist);

  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="/icon/sprite.svg#icon-search"></use>
      </S.SearchSvg>
      <S.SearchText
        type="search"
        placeholder="Поиск"
        name="search"
        onChange={(e) => {
          dispatch(setSearch({ value: e.target.value, tracks: pagePlaylist }));
        }}
      />
    </S.CenterblockSearch>
  );
}

export default Search;
