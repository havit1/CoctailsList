import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FilterInterface, FiltersListInterface } from "../../Interfaces/index";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/FiltersPageStyles";

export interface FilterPagePropsInterface extends FiltersListInterface {
  addRemoveFilter: Function;
  choosedFilters: Array<String>;
}

const FilterPage: React.StatelessComponent<FilterPagePropsInterface> = ({
  filters,
  addRemoveFilter,
  choosedFilters,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([...choosedFilters]);
  const navigation = useNavigation();
  const isMarked = (choosedFilter: string): boolean => {
    return selectedFilters.find((filter) => filter === choosedFilter)
      ? true
      : false;
  };
  return (
    <>
      <FlatList<FilterInterface>
        style={styles.listContainer}
        data={filters}
        keyExtractor={(item) => item.strCategory}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.row}
                onPress={() => {
                  // addRemoveFilter(item.strCategory);
                  if (selectedFilters.indexOf(item.strCategory) > -1) {
                    const list = [...selectedFilters].filter(
                      (el) => el !== item.strCategory
                    );
                    setSelectedFilters(list);
                  } else {
                    const list = [...selectedFilters, item.strCategory];
                    setSelectedFilters(list);
                  }
                }}
              >
                <Text style={styles.text}>{item.strCategory}</Text>
                {isMarked(item.strCategory) && (
                  <Ionicons name="md-checkmark" size={32} color="black" />
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View
        style={{
          padding: 10,
          flex: 1,
          maxHeight: 70,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: "80%",
            height: "100%",
            marginHorizontal: "auto",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            addRemoveFilter(selectedFilters);
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FilterPage;
