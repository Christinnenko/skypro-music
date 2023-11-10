import "./App.css";
import AudioPlayer from "./components/AudioPlayer.jsx";
import NavMenu from "./components/NavMenu.jsx";
import Tracklist from "./components/Tracklist.jsx";
import Search from "./components/Search.jsx";
import Filters from "./components/Filters.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <NavMenu />
          <div className="main__centerblock centerblock">
            <Search />
            <h2 className="centerblock__h2">Треки</h2>
            <Filters />
            <Tracklist />
          </div>
          <Sidebar />
        </main>
        <AudioPlayer />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default App;
