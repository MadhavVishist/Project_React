import React from "react";
import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";

const SearchBar = observer(() => {
  const handleSearch = (event) => {
    dataStore.setSearchQuery(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search Pokemon..."
      onChange={handleSearch}
      value={dataStore.searchQuery}
      className="search-bar"
    />
  );
});

export default SearchBar;
