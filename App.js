import { Home } from "./pages/Home/Home";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import AlataRegular from "./assets/fonts/Alata-Regular.ttf"
import {useFonts} from "expo-font"
import { Forecast } from "./pages/Forecast/Forecast";

const Stack = createNativeStackNavigator();
const navTheme ={
  colors:{
    background: "transparent",
  }
}
export default function App() {
  const [isFontLoaded] = useFonts({
    "Alata-Regular" : AlataRegular
  })
  return(
      <NavigationContainer theme={navTheme}>
              {isFontLoaded ?(
              <Stack.Navigator screenOptions={{headerShown: false, animation:"fade"}} initialRouteName="Home">
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Forecast" component={Forecast} />
              </Stack.Navigator>
              ): null}
      </NavigationContainer>
  );
}


