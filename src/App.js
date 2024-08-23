import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { dataStore } from "./stores/DataStore";
import DataDisplay from "./components/DataDisplay";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import "./App.css";

const App = observer(() => {
  useEffect(() => {
    dataStore.fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon Data Viewer :)</h1>
      </header>
      <SearchBar />
      <DataDisplay />
      <Pagination />
      
    </div>
  );
});

export default App;
