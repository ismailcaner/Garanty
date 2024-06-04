import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useScheduledNotifications } from './src/NotificationService';
import { ThemeProvider, useTheme } from "./src/themeContext";
import { TouchableOpacity, View } from "react-native";
import style from "./src/style";

import Home from "./screens/home";
import Add from "./screens/add";
import Icon from "react-native-vector-icons/Ionicons";


const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme, toggleTheme } = useTheme();
  useScheduledNotifications();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: "Garanty",
        headerTintColor: theme === "dark" ? "white" : "black",
        headerStyle: {
          backgroundColor: theme === "dark" ? "#18181b" : "white",
        },
        headerRight: () => (
          <TouchableOpacity onPress={toggleTheme}>
            <View
              style={[style.DarkLight, theme === "dark" ? style.Dark : null]}
            >
              <Icon
                name={"sunny-outline"}
                size={20}
                color={theme === "dark" ? "white" : "black"}
              />
            </View>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
  );
};

const App = () => (
  <ThemeProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </ThemeProvider>
);

export default App;
