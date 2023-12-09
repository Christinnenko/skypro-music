import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/main(tracks)";
import { NotFound } from "./pages/not-found";
import { Login } from "./pages/login";
import { Registration } from "./pages/registration";
import { Category } from "./pages/category/CategoryPage.jsx";
import { Favorites } from "./pages/favorites";
import { ProtectedRoute } from "./components/protected-route";
import PropTypes from "prop-types";

export const AppRoutes = ({ user, setUser }) => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/category/:id" element={<Category />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

// Валидация PropTypes
AppRoutes.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  setUser: PropTypes.func.isRequired,
};

export default AppRoutes;
