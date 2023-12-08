import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/main(tracks)";
import { NotFound } from "./pages/not-found";
import { Login } from "./pages/login";
import { Registration } from "./pages/registration";
import { Category } from "./pages/category/CategoryPage.jsx";
import { Favorites } from "./pages/favorites";
import { ProtectedRoute } from "./components/protected-route";
import PropTypes from "prop-types";

export const AppRoutes = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/*" element={<NotFound />} />
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={Boolean(user)}>
            <Route path="/login" element={<Login />} />
          </ProtectedRoute>
        }
      />
      <Route path="/registration" element={<Registration />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

// Валидация PropTypes
AppRoutes.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
};

export default AppRoutes;
