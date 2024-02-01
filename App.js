import { Home } from "./pages/Home/Home";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { S } from "./App.style";
import { ImageBackground } from "react-native";
import backgroundIMG from "./assets/background.png"
import AlataRegular from "./assets/fonts/Alata-Regular.ttf"
import {useFonts} from "expo-font"

export default function App() {
  const [isFontLoaded] = useFonts({
    "Alata-Regular" : AlataRegular
  })
  return(
   
      <ImageBackground source={backgroundIMG} style={S.img_Background} imageStyle={S.img}>
        <SafeAreaProvider>
          <SafeAreaView style={S.container}>
            {isFontLoaded ? <Home /> : null}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
  );
}


