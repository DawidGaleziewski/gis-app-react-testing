import logo from "./logo.svg";
import "./App.css";

import KepplerMap from "./components/KepplerMap/KepplerMap";
import LeafletMap from "./components/LeafletMap/LeafletMap";
import OpenLayersMap from "./components/OpenLayersMap/OpenLayersMap";

function App() {
  return (
    <div className="App">
      {/* <LeafletMap /> */}
      {/* <KepplerMap /> */}
      <OpenLayersMap />
    </div>
  );
}

export default App;
