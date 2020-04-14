import React, { useState, useEffect } from "react";
import { filteredDrinkRequest, filtersRequest } from "./src/tools";
import Navigator from "./src/Navigator";

import { CoctailInterface, FilterInterface } from "./src/Interfaces/index";

export default function App() {
  const [coctailsList, setConcatilsList] = useState<Array<CoctailInterface>>(
    []
  );
  const [choosedFilters, setChoosedFilters] = useState<Array<string>>([]);
  const [filtersList, setFiltersList] = useState<Array<FilterInterface>>([]);

  useEffect(() => {
    if (choosedFilters.length === 0) return;
    const filteredDrinks = filteredDrinkRequest(choosedFilters);
    filteredDrinks.then((data) => setConcatilsList(data![0].data.drinks));
  }, [choosedFilters]);

  const addRemoveFilter = (filter: string): void => {
    if (choosedFilters.indexOf(filter) > -1) {
      const list = [...choosedFilters].slice(choosedFilters.indexOf(filter), 1);
      setChoosedFilters(list);
    } else {
      const list = [...choosedFilters, filter];
      setChoosedFilters(list);
    }
  };

  useEffect(() => {
    const filters = filtersRequest();
    filters.then((data): void => {
      setChoosedFilters([data.drinks[0].strCategory]);
      setFiltersList(data);
    });
  }, []);

  return <Navigator coctails={coctailsList} filters={filtersList} />;
}
