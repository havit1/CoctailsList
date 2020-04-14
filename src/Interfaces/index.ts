export interface CoctailInterface {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CoctailsListInterface {
  coctails: Array<CoctailInterface>;
}

export interface DrinkInterface extends CoctailsListInterface {
  index: number;
  separators?: Object;
}

export interface NavigatorProps {
  coctails: Array<{ idDrink: string; strDrink: string; strDrinkThumb: string }>;
  filters: object[];
}

export interface FilterInterface {
  strCategory: string;
}

export interface FiltersListInterface {
  filters: Array<FilterInterface>;
}
