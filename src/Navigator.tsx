import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomePage from "./Components/HomePage/HomePage";
import FilterPage from "./Components/FilterPage/FilterPage";

type RootStackParamList = {
  Home: undefined;
  FilterPage: undefined;
};

interface NavigatorProps {
  coctails: Array<{ idDrink: string; strDrink: string; strDrinkThumb: string }>;
  filters: object[];
}

const Navigator: React.StatelessComponent<NavigatorProps> = ({
  coctails,
  filters,
}) => {
  const RootStack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={(): any => <HomePage coctails={coctails} />}
        />
        <RootStack.Screen name="FilterPage" component={FilterPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
