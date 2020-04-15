import axios from "axios";

export async function filteredDrinkRequest(filter: string) {
  try {
    const { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`
    );
    data.name = filter;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function filtersRequest() {
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
