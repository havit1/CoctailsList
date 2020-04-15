import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image } from "react-native";
import styles from "../../styles/HomePageStyles";
import { CoctailsListInterface } from "../../Interfaces/index";
import { filteredDrinkRequest } from "../../tools";
interface HomePageProps {
  choosedFilters: Array<string>;
}

const HomePage: React.StatelessComponent<HomePageProps> = ({
  choosedFilters,
}) => {
  const [listNumber, setListNumber] = useState<number>(0);
  const [coctailsList, setCoctailsList] = useState<
    Array<CoctailsListInterface>
  >([]);

  const loadMoreDrinks = (): void => {
    if (listNumber === choosedFilters.length - 1) return; // if no more lists
    requestMoreDrinks(listNumber + 1);
    setListNumber((state) => state + 1);
  };

  const requestMoreDrinks = (number: number): void => {
    if (choosedFilters.length === 0) return;
    const filteredDrink = filteredDrinkRequest(choosedFilters[number]);
    filteredDrink.then((data) => {
      setCoctailsList((state) => state.concat(data));
    });
  };

  useEffect(() => {
    setCoctailsList([]);
    if (listNumber !== 0) {
      setListNumber(0);
    }
    if (choosedFilters.length > 0) {
      let filteredDrink = filteredDrinkRequest(choosedFilters[0]);
      filteredDrink.then((data) => {
        setCoctailsList([data]);
      });
    }
  }, [choosedFilters]);

  return (
    <FlatList<CoctailsListInterface>
      data={coctailsList}
      keyExtractor={(item) => item.name}
      onEndReached={() => loadMoreDrinks()}
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
