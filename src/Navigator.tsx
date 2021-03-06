import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import HomePage from "./Components/HomePage/HomePage";
import FilterPage from "./Components/FilterPage/FilterPage";

import { FiltersListInterface } from "./Interfaces/index";
import { TouchableOpacity } from "react-native-gesture-handler";

type RootStackParamList = {
  Home: undefined;
  FilterPage: undefined;
};

export interface NavigatorProps extends FiltersListInterface {
  addRemoveFilter: Function;
  choosedFilters: Array<string>;
}

const Navigator: React.StatelessComponent<NavigatorProps> = ({
  filters,
  addRemoveFilter,
  choosedFilters,
}) => {
  const RootStack = createStackNavigator<RootStackParamList>();

  const Home = () => <HomePage choosedFilters={choosedFilters} />;

  const Filters = () => (
    <FilterPage
      filters={filters}
      choosedFilters={choosedFilters}
      addRemoveFilter={addRemoveFilter}
    />
  );

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: "Drinks",
            headerRight: () => (
              //for some reason <Ionicons name="filter"/> doen't work :(
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FilterPage");
                }}
              >
                <FontAwesome.Button
                  disabled
                  size={32}
                  type="clear"
                  backgroundColor="transparent"
                  color="black"
                  name="filter"
                />
              </TouchableOpacity>
            ),
          })}
        />

        <RootStack.Screen name="FilterPage" component={Filters} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
