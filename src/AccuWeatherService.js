import axios from "axios";
import {
  accuWeatherCurrentWeatherResponseToMyWeather,
  accWeatherCityToMyCity,
  accWeatherFiveDayOfDailyForecastsToMyForecast
} from "./utils/tiny";

const apikey = "5gBVTyGGGITyydaQ3o39JbRLX9HUV9SW";
const ACCU_WEATHER_API_ROOT = "https://dataservice.accuweather.com";
const LOCATIONS_API = `${ACCU_WEATHER_API_ROOT}/locations/v1/cities`;
const CURRENT_WEATHER_API = `${ACCU_WEATHER_API_ROOT}/currentconditions/v1`;
const FIVE_DAYS_OF_DAILY_FORECASTS_API = `${ACCU_WEATHER_API_ROOT}/forecasts/v1/daily/5day`;

class AccuWeatherService {
  async autocompleteSearchCities(q) {
    return axios.get(`${LOCATIONS_API}/autocomplete`, { params: { q, apikey } }).then(response => {
      return response.data && Array.isArray(response.data) ? response.data.map(accWeatherCityToMyCity) : [];
    });
  }

  async fetchCurrentWeather(city) {
    return axios.get(`${CURRENT_WEATHER_API}/${city.key}`, { params: { apikey } }).then(async res => {
      return { ...accuWeatherCurrentWeatherResponseToMyWeather(res.data[0]), cityKey: city.key };
    });
  }

  async fetchFiveDaysOfDailyForecasts(city) {
    return axios
      .get(`${FIVE_DAYS_OF_DAILY_FORECASTS_API}/${city.key}`, { params: { apikey } })
      .then(res => accWeatherFiveDayOfDailyForecastsToMyForecast(res.data));
  }

  async searchCityByGeoPosition(latitude, longitude) {
    return axios.get(`${LOCATIONS_API}/geoposition/search`, { params: { q: `${latitude},${longitude}`, apikey } }).then(response => {
      return response.data ? accWeatherCityToMyCity(response.data) : null;
    });
  }
}
const instance = new AccuWeatherService();
export default Object.freeze(instance);
