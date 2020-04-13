import React from "react";
import { Text, View, FlatList } from "react-native";

interface HomePageProps {
  coctails: Array<{
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }>;
}

interface drinkInterface extends HomePageProps {
  index: number;
  separators?: Object;
}

const HomePage: React.StatelessComponent<HomePageProps> = ({
  coctails = [],
}) => {
  return (
    <FlatList<{
      idDrink: string;
      strDrink: string;
      strDrinkThumb: string;
    }>
      style={{ height: "100%" }}
      data={coctails}
      keyExtractor={(item) => item.idDrink}
      renderItem={(render) => {
        return <Text key={render.index}>{render.item.strDrink}</Text>;
      }}
    />
  );
};

export default HomePage;
