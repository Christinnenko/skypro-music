import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/main(tracks)";
import { NotFound } from "./pages/not-found";
import { Category } from "./pages/category/CategoryPage.jsx";
import { Favorites } from "./pages/favorites";
import { ProtectedRoute } from "./components/protected-route";
import PropTypes from "prop-types";
import Register from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";
import { PageLayout } from "./pages/Layout/Layout.jsx";

export const AppRoutes = ({
  user,
  handleLogout,
  setCurrentTrack,
  tracks,
  setTracks,
  tracksError,
  setTracksError,
}) => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout handleLogout={handleLogout} />}>
        <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
          <Route
            path="/category/:id"
            element={<Category handleLogout={handleLogout} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                handleLogout={handleLogout}
                tracks={tracks}
                tracksError={tracksError}
              />
            }
          />
          <Route
            index
            element={
              <Main
                user={user}
                handleLogout={handleLogout}
                setCurrentTrack={setCurrentTrack}
                tracks={true}
                tracksError={true}
                setTracks={setTracks}
                setTracksError={setTracksError}
              />
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
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
  tracks: PropTypes.array.isRequired,
  setTracks: PropTypes.func.isRequired,
  tracksError: PropTypes.array.isRequired,
  setTracksError: PropTypes.func.isRequired,
};

export default AppRoutes;
