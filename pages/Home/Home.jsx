import { View } from "react-native"
import {S} from "./Home.style"
import {requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "../../api/meteo";
import { Txt } from "../../components/Txt/Txt";
import { MeteoBasic } from "../../components/MetoBasic/MeteoBasic";
import { getWeatherInterpretation } from "../../services/meteo-service";
import { MeteoAdvanced } from "../../components/MeteoAdvanced/MeteoAdvanced";

export function Home(){
    const [coords, setCoords] = useState();
    const [weather, setWeather] = useState();
    const [city, setCity] = useState();
    const currentWeather = weather?.current_weather;
    useEffect(()=>{
        getUserCoords();
    })
    useEffect(()=>{
        if(coords){
            fetchWeather(coords);
            fetchCity(coords)
        }
    }, [coords]);
    async function getUserCoords(){
        let {status} = await requestForegroundPermissionsAsync()
        if (status==="granted"){
            const location = await getCurrentPositionAsync();
            setCoords({
                lat:location.coords.latitude,
                lng:location.coords.latitude
            });
            
        }else{
            setCoords({lat:"48.85", lng:"2.35"});
        }
    }

    async function fetchWeather(coordinates){
        const weatherResponse = await MeteoAPI.fecthWeatherFromCoords(coordinates);
        setWeather(weatherResponse);
    }

    async function fetchCity(coordinates){
        const cityResponse = await MeteoAPI.fecthCityFromCoords(coordinates);
        setCity(cityResponse);
    }

    return currentWeather? (
    <>
        <View style={S.meteo_basic}>
            <MeteoBasic temperature={Math.round(currentWeather?.temperature)}
            city={city}
            interpretation = {getWeatherInterpretation(currentWeather.weathercode)} />
        </View>
        <View style={S.searchbar_container}></View>
        <View style={S.meteo_advance}>
            <MeteoAdvanced wind={currentWeather.windspeed} dusk={weather.daily.sunrise[0].split("T")[1]} dawn={weather.daily.sunset[0].split("T")[1]} />
        </View>
    </>
    ): null;
}