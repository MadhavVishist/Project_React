import React from "react";
import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";

const DataDisplay = observer(() => {
  if (dataStore.loading) return <div>Loading...</div>;
  if (dataStore.error) return <div>Error: {dataStore.error}</div>;

  return (
    <div className="data-display">
      {dataStore.paginatedData.map((item, index) => (
        <div key={index} className="data-item">
          <img src={item.image} alt={item.name} className="pokemon-image" />
          <h3>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
          <ul>
            {item.stats.map((stat, statIndex) => (
              <li key={statIndex}>
                {stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}: {stat.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
});

export default DataDisplay;
