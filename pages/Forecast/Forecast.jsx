import { Container } from "../../components/Container/Container.jsx";
import { Txt } from "../../components/Txt/Txt.jsx";
import { S } from "./Forecast.style.js";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { ForecastListItem } from "../../components/ForecastListItem/ForecastListItem.jsx";
import { getWeatherInterpretation } from "../../services/meteo-service.js";
import { dateToDDMM, DAYS } from "../../services/date-service.js";

export function Forecast({}) {
  const { params } = useRoute();
  const nav = useNavigation();

  const backButton = (
    <TouchableOpacity style={S.back_btn} onPress={() => nav.goBack()}>
      <Txt> {"<"} </Txt>
    </TouchableOpacity>
  );
  const header = (
    <View style={S.header}>
      {backButton}
      <View style={S.header_texts}>
        <Txt>{params.city}</Txt>
        <Txt style={S.subtitle}>Prévisions sur 7 jours</Txt>
      </View>
    </View>
  );

  const forecastList = (
    <View style={S.forecastList}>
      {params.time.map((time, index) => {
        const code = params.weathercode[index];
        const image = getWeatherInterpretation(code).image;
        const date = new Date(time);
        const day = DAYS[date.getDay()];
        const temperature = params.temperature_2m_max[index];
        return (
          <ForecastListItem
            image={image}
            day={day}
            key={time}
            date={dateToDDMM(date)}
            temperature={temperature.toFixed(0)}
          />
        );
      })}
    </View>
  );
  return (
    <Container>
      {header}
      {forecastList}
    </Container>
  );
}