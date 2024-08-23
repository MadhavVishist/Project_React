import React from "react";
import { observer } from "mobx-react-lite";
import { dataStore } from "../stores/DataStore";

const Pagination = observer(() => {
  const { currentPage, totalPages } = dataStore;

  const handlePrevious = () => {
    if (currentPage > 1) {
      dataStore.setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dataStore.setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
});

export default Pagination;
