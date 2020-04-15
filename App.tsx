import React, { useState, useEffect, useCallback } from "react";
import { filteredDrinkRequest, filtersRequest } from "./src/tools";
import Navigator from "./src/Navigator";

import { CoctailsListInterface, FilterInterface } from "./src/Interfaces/index";

export default function App() {
  const [coctailsList, setConcatilsList] = useState<
    Array<CoctailsListInterface>
  >([]);
  const [choosedFilters, setChoosedFilters] = useState<Array<string>>([]);
  const [filtersList, setFiltersList] = useState<Array<FilterInterface>>([]);
  const [listNumber, setListNumber] = useState<number>(0);

  useEffect(() => {
    const filters = filtersRequest();
    filters.then((data): void => {
      setChoosedFilters([data.drinks[0].strCategory]);
      setFiltersList(data.drinks);
      let filteredDrink = filteredDrinkRequest(data.drinks[0].strCategory);
      filteredDrink.then((data) => {
        setConcatilsList([data]);
      });
    });
  }, []);

  const setNextListNumber = () => {
    if (listNumber === choosedFilters.length - 1) return;
    setListNumber((val) => val + 1);
  };

  useEffect(() => {
    console.log(coctailsList.length, choosedFilters.length);

    if (coctailsList.length === 0 && choosedFilters.length > 0) {
      let filteredDrink = filteredDrinkRequest(choosedFilters[0]);
      filteredDrink.then((data) => {
        setConcatilsList([data]);
      });
    }
  }, [choosedFilters]);

  useEffect(() => {
    if (choosedFilters.length === 0) return;
    let filteredDrink;
    console.log(listNumber, choosedFilters);
    filteredDrink = filteredDrinkRequest(choosedFilters[listNumber]);
    filteredDrink.then((data) => {
      setConcatilsList((state) => [...state, data]);
    });
  }, [listNumber]);

  const addRemoveFilter = (filter: string): void => {
    if (choosedFilters.indexOf(filter) > -1) {
      const list = [...choosedFilters].filter((el) => el !== filter);
      setChoosedFilters(list);
      setConcatilsList([]);
      setListNumber(0);
    } else {
      const list = [...choosedFilters, filter];
      setChoosedFilters(list);
    }
  };

  return (
    <Navigator
      setListNumber={setNextListNumber}
      addRemoveFilter={addRemoveFilter}
      coctails={coctailsList}
      filters={filtersList}
      choosedFilters={choosedFilters}
    />
  );
}
