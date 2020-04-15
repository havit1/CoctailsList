import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FilterInterface, FiltersListInterface } from "../../Interfaces/index";
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
  const isMarked = (choosedFilter: string): boolean => {
    return choosedFilters.find((filter) => filter === choosedFilter)
      ? true
      : false;
  };
  return (
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
                addRemoveFilter(item.strCategory);
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
  );
};

export default FilterPage;
