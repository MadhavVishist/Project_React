import { makeAutoObservable } from "mobx";
import axios from "axios";

class DataStore {
  data = [];
  loading = false;
  error = null;
  searchQuery = "";
  currentPage = 1;
  itemsPerPage = 20;

  constructor() {
    makeAutoObservable(this);
  }

  // Fetch data from the PokeAPI
  fetchData = async () => {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
      const basicData = response.data.results;

      // Fetch additional details (stats and image) for each Pokémon
      const detailedDataPromises = basicData.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: detailsResponse.data.sprites.front_default,
          stats: detailsResponse.data.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
        };
      });

      this.data = await Promise.all(detailedDataPromises);
    } catch (error) {
      this.error =`Failed to fetch Pokémon data: ${error.message}`;
    } finally {
      this.loading = false;
    }
  };

  // Set search query
  setSearchQuery(query) {
    this.searchQuery = query.toLowerCase();
    this.currentPage = 1;
  }

  // Set current page
  setCurrentPage(page) {
    this.currentPage = page;
  }

  // Filtered data based on search query
  get filteredData() {
    return this.data.filter((item) =>
      item.name.toLowerCase().includes(this.searchQuery)
    );
  }

  // Paginated data
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  // Total pages based on filtered data
  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }
}

export const dataStore = new DataStore();
