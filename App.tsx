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
    console.log("Loding 3");

    const filters = filtersRequest();
    filters.then((data): void => {
      setChoosedFilters((state) =>
        data.drinks.map((f: { strCategory: string }) => f.strCategory)
      );
      setFiltersList(data.drinks);
    });
  }, []);

  const setNextListNumber = () => {
    if (listNumber === choosedFilters.length - 1) return;
    else setListNumber((state) => state + 1);
  };

  useEffect(() => {
    console.log(listNumber);
    if (choosedFilters.length === 0) return;

    const filteredDrink = filteredDrinkRequest(choosedFilters[listNumber]);
    filteredDrink.then((data) => {
      setConcatilsList((state) => [...state, data]);
    });
  }, [listNumber]);

  useEffect(() => {
    if (coctailsList.length === 0 && choosedFilters.length === 1) {
      console.log("Loding 1");
      let filteredDrink = filteredDrinkRequest(choosedFilters[0]);
      filteredDrink.then((data) => {
        setConcatilsList([data]);
      });
    }
  }, [choosedFilters]);

  useEffect(() => {
    console.log("Loding 2");

    setConcatilsList([]);
    if (listNumber !== 0) {
      setListNumber(0);
    } else if (choosedFilters.length > 0) {
      let filteredDrink = filteredDrinkRequest(choosedFilters[0]);
      filteredDrink.then((data) => {
        setConcatilsList([data]);
      });
    }
  }, [choosedFilters]);

  return (
    <Navigator
      setListNumber={setNextListNumber}
      addRemoveFilter={setChoosedFilters}
      coctails={coctailsList}
      filters={filtersList}
      choosedFilters={choosedFilters}
    />
  );
}
