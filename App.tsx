import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen"; // contains MeasurementForm + History
import GrowthChartScreen from "./GrowthChartScreen"; // chart only
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";

            if (route.name === "Home") iconName = "home";
            else if (route.name === "Chart") iconName = "bar-chart";
            // if you add History screen back:
            // else if (route.name === "History") iconName = "time";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chart" component={GrowthChartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

