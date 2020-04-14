import React from "react";
import { Text, View, FlatList, Image } from "react-native";
import { homePageStyles } from "../../styles/HomePageStyles";

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
        return (
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: render.item.strDrinkThumb }}
            />
            <Text key={render.index}>{render.item.strDrink}</Text>
          </View>
        );
      }}
    />
  );
};

export default HomePage;
