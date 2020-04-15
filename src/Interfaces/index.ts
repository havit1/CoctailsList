export interface CoctailInterface {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CoctailsListInterface {
  drinks: Array<CoctailInterface>;
  name: string;
}

export interface DrinkInterface extends CoctailsListInterface {
  index: number;
  separators?: Object;
}

export interface FilterInterface {
  strCategory: string;
}

export interface FiltersListInterface {
  filters: Array<FilterInterface>;
}
