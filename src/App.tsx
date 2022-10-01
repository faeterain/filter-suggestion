import * as React from "react";
import './App.css';
import { ISuggestionFilter } from "./components/SuggestionFilter/ISuggestionFilter";
import { SuggestionFilter } from './components/SuggestionFilter/SuggestionFilter';
import data from "./services/mockdata.json";

const option: ISuggestionFilter = {
  limitItemsWithImg: 4,
  order: ["suggestion", "collection", "product"],
  minSearchLetter: 3,
  customProduction: (<></>),
  itemsWithImg: data
}
function App() {
  return (
    <div className="App">
      <SuggestionFilter {...option} />
    </div>
  );
}

export default App;
