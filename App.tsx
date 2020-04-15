import React, { useState, useEffect } from "react";
import { filtersRequest } from "./src/tools";
import Navigator from "./src/Navigator";

import { FilterInterface } from "./src/Interfaces/index";

export default function App() {
  const [choosedFilters, setChoosedFilters] = useState<Array<string>>([]);
  const [filtersList, setFiltersList] = useState<Array<FilterInterface>>([]);

  useEffect(() => {
    const filters = filtersRequest();
    filters.then((data): void => {
      setChoosedFilters((state) =>
        data.drinks.map((f: { strCategory: string }) => f.strCategory)
      );
      setFiltersList(data.drinks);
    });
  }, []);

  return (
    <Navigator
      addRemoveFilter={setChoosedFilters}
      filters={filtersList}
      choosedFilters={choosedFilters}
    />
  );
}
