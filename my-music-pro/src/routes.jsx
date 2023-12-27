import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/main(tracks)";
import { NotFound } from "./pages/not-found";
import { Category } from "./pages/category/CategoryPage.jsx";
import { Favorites } from "./pages/favorites";
import { ProtectedRoute } from "./components/protected-route";
import PropTypes from "prop-types";
import AuthPage from "./pages/auth/AuthPage.jsx";

export const AppRoutes = ({
  user,
  handleLogout,
  setIsLoginMode,
  isLoginMode,
}) => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route path="/category/:id" element={<Category />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/"
          element={<Main user={user} handleLogout={handleLogout} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route
        path="/login"
        element={
          <AuthPage
            user={user}
            setIsLoginMode={setIsLoginMode}
            isLoginMode={isLoginMode}
          />
        }
      />
    </Routes>
  );
};

AppRoutes.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLoginMode: PropTypes.bool.isRequired,
  setIsLoginMode: PropTypes.func.isRequired,
};

export default AppRoutes;
