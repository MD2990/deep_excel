import { proxy } from "valtio";

const state = proxy({
  theFile: [],
  isFilteredData: false,
  selectedFilter: "",
  filteredData: [],
  isLoading: false,
  count: 1,
  tableHeads: [],
  keys: [],
  titles: [],
  data: [],
  btn: false,
  searchTerm: "",
  currentPage: parseInt(0),
  pageCount: null,
  PER_PAGE: 15,
  offset: 0,
  title: "",
  api: "defaultApi",
  dbData: [],
  dbDataCount: 0,
  postData: {},
  id: "",
});

export default state;
