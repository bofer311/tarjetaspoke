import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TeamView from "../screens/TeamView"; // Asegúrate de que esta ruta también sea correcta

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Lista de Pokémon" }}
        />
        <Stack.Screen
          name="TeamView"
          component={TeamView}
          options={{ title: "Equipo Pokémon" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
