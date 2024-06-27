import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider, useTheme } from "./src/themeContext";
import { TouchableOpacity, View } from "react-native";
import style from "./src/style";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import Home from "./screens/home";
import Add from "./screens/add";
import Icon from "react-native-vector-icons/Ionicons";
import DropdownComponent from "./src/dropdown";
import Setting from "./screens/setting";

const Stack = createStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={style.errorToast}
      text1Style={style.errorText1}
      text2Style={style.errorText2}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={style.errorToast}
      text1Style={style.errorText1}
      text2Style={style.errorText2}
    />
  ),
  info: (props) => (
    <ErrorToast
      {...props}
      style={style.errorToast}
      text1Style={style.errorText1}
      text2Style={style.errorText2}
    />
  ),
};

const AppNavigator = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animationEnabled: false,
        title: "Garanty",
        headerTintColor: theme === "dark" ? "white" : "black",
        headerStyle: {
          backgroundColor: theme === "dark" ? "#18181b" : "white",
        },
        headerLeft: () => null, 
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Setting");
            }}
          >
            <View
              style={[style.DarkLight, theme === "dark" ? style.Dark : null]}
            >
              <Icon
                name={"settings-outline"}
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
      <Stack.Screen name="DropdownComponent" component={DropdownComponent} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

const App = () => (
  <ThemeProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    <Toast config={toastConfig} />
  </ThemeProvider>
);

export default App;
