import React, { useEffect } from "react";
import { create } from "jss";
import { ThemeProvider as ScThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import { createMuiTheme, jssPreset, StylesProvider, ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getIsDarkMode } from "../redux/ui/ui.selectors";
import { darkThemeOptions, lightThemeOptions } from "../configurations/theme";
import { useCurrentPosition } from "react-use-geolocation";
import { openSnackbar } from "../redux/ui/ui.actions";
import weatherService from "../AccuWeatherService";
import { addToMap, setSelectedCity } from "../redux/weather/weather.actions";

export default function App() {
  const isDarkTheme = useSelector(getIsDarkMode);
  const theme = createMuiTheme(isDarkTheme ? darkThemeOptions : lightThemeOptions);
  const dispatch = useDispatch();
  const [position, error] = useCurrentPosition();

  useEffect(
    function() {
      (function() {
        try {
          async function onGetGeoLocationSuccess({ coords: { latitude, longitude } }) {
            const city = await weatherService.searchCityByGeoPosition(latitude, longitude);
            dispatch(setSelectedCity(city.key));
            dispatch(addToMap(city));
          }
          function onGetGeoLocationError() {
            const howToEnableGeoLocationInstructionUrl = "https://docs.buddypunch.com/en/articles/919258-how-to-enable-location-services-for-chrome-safari-and-android-ios-devices-gps-setting";
            dispatch(openSnackbar(<div>Using location is disabled, <a style={{color:"white"}} href={howToEnableGeoLocationInstructionUrl}> How to enable it?</a></div>));
          }
          navigator.geolocation.getCurrentPosition(onGetGeoLocationSuccess, onGetGeoLocationError);
        } catch (e) {
          dispatch(openSnackbar("Can't find your city by the given location"));
        }
      })();
    },
    [dispatch, position, error]
  );

  return (
    <StylesProvider jss={create({ plugins: [...jssPreset().plugins] })}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ScThemeProvider theme={theme}>
            <BrowserRouter>
              <Main />
            </BrowserRouter>
          </ScThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </StylesProvider>
  );
}
