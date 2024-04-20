import { Routes, Route, useNavigate } from "react-router-dom";
import { Main } from "./pages/main(tracks)/Main.jsx";
import { NotFound } from "./pages/not-found/NotFound.jsx";
import { Category } from "./pages/category/Category.jsx";
import { Favorites } from "./pages/favorites/Favorites.jsx";
import { ProtectedRoute } from "./components/protected-route/ProtectedRoute.jsx";
import PropTypes from "prop-types";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import { PageLayout } from "./pages/Layout/Layout.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearFilters } from "./store/actions/creators/creators.js";

export const AppRoutes = ({
  user,
  handleLogout,
  setCurrentTrack,
  loading,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = () => {
      dispatch(clearFilters());
    };

    return cleanup;
  }, [navigate, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<PageLayout handleLogout={handleLogout} />}>
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
          <Route
            path="/category/:id"
            element={<Category handleLogout={handleLogout} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites handleLogout={handleLogout} loading={loading} />
            }
          />
          <Route
            index
            element={
              <Main
                user={user}
                handleLogout={handleLogout}
                setCurrentTrack={setCurrentTrack}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
        </Route>
      </Route>

      <Route path="/login" element={<Login user={user} />} />
      <Route path="/register" element={<Register user={user} />} />
    </Routes>
  );
};

AppRoutes.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default AppRoutes;
