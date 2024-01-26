import { Categories } from "../../constants.js";
import { useParams } from "react-router-dom";
import * as Style from "../Pages.styles.js";
import * as S from "../../App.styles.js";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import { LoginSidebar } from "../../components/Sidebar/Sidebar.jsx";
import Search from "../../components/Search/Search.jsx";
import PropTypes from "prop-types";
import * as St from "../Pages.styles.js";

export const Category = ({ handleLogout }) => {
  const params = useParams();

  const category = Categories.find(
    (category) => category.id === Number(params.id)
  );
  const title = `${category.title}`;

  return (
    <>
      <S.Main>
        <NavMenu handleLogout={handleLogout} />
        <div>
          <Search />
          <Style.Text>{`Здесь будет '${title}'`}</Style.Text>
        </div>
        <St.ContainerSidebar>
          <LoginSidebar handleLogout={handleLogout} />
        </St.ContainerSidebar>
      </S.Main>
    </>
  );
};

Category.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
