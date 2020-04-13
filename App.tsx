import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigator from "./src/Navigator";

export default function App() {
  const [coctailsList, setConcatilsList] = useState<
    Array<{ idDrink: string; strDrink: string; strDrinkThumb: string }>
  >([]);

  useEffect(() => {
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink"
      )
      .then((res) => setConcatilsList(res.data.drinks));
  }, []);

  return <Navigator coctails={coctailsList} filters={[]} />;
}
