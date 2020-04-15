import React from "react";
import { Text, View, FlatList, Image } from "react-native";
import styles from "../../styles/HomePageStyles";
import { CoctailsListInterface } from "../../Interfaces/index";
interface HomePageProps {
  coctails: Array<CoctailsListInterface>;
  setListNumber: Function;
}

const HomePage: React.StatelessComponent<HomePageProps> = ({
  coctails = [],
  setListNumber,
}) => {
  return (
    <FlatList<CoctailsListInterface>
      data={coctails}
      keyExtractor={(item) => item.name}
      onEndReached={() => setListNumber()}
      renderItem={(render) => {
        return (
          <View style={styles.listContainer} key={render.index}>
            <Text style={styles.nameText}>{render.item.name}</Text>
            {render.item.drinks.map((drink) => (
              <View style={styles.drinkRow} key={drink.idDrink}>
                <Image
                  style={styles.image}
                  source={{ uri: drink.strDrinkThumb }}
                />
                <Text style={styles.name}>{drink.strDrink}</Text>
              </View>
            ))}
          </View>
        );
      }}
    />
  );
};

export default HomePage;
