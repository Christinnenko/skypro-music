import { useEffect, useState } from "react";

import "../../App.css";
import NavMenu from "../NavMenu/NavMenu.jsx";
import Search from "../Search/Search.jsx";
import Filters from "../Filters/Filters.jsx";
import App from "../../App.jsx";
import {
  EmulationAudioPlayer,
  EmulationSidebar,
  EmulationTracklist,
} from "./EmulationLoading.jsx";

function EmulationApp() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <NavMenu />
          <div className="main__centerblock centerblock">
            <Search />
            <h2 className="centerblock__h2">Треки</h2>
            <Filters />
            <EmulationTracklist />
          </div>
          <EmulationSidebar />
        </main>
        <EmulationAudioPlayer />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

function ShowEmulationApp() {
  const [visibleComponent, setVisibleComponent] = useState(<EmulationApp />);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setVisibleComponent(<App />);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  });

  return <div>{visibleComponent}</div>;
}

export { EmulationApp, ShowEmulationApp };
