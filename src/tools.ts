import axios from "axios";

export async function filteredDrinkRequest(filters: string[] = []) {
  console.log("Requesting filtered drinks");
  console.log(filters);
  const promiseArray = filters.map((filter) =>
    axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`
    )
  );

  try {
    const data = await Promise.all(promiseArray);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function filtersRequest() {
  console.log("Requesting filters");
  try {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
  }
}
