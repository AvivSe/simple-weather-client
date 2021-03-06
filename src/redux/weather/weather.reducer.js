import {
  ADD_TO_FAVORITES,
  ADD_TO_HISTORY,
  ADD_TO_MAP,
  REMOVE_FROM_FAVORITES,
  REMOVE_FROM_HISTORY, SET_NOT_PENDING, SET_ON_PENDING,
  SET_SELECTED_CITY,
  TOGGLE_IS_FAHRENHEIT
} from "./weather.actions";

export const INITIAL_STATE = {
  onPending: [],
  isFahrenheit: false,
  selectedCity: "215854",

  //on follow
  ids: ["215854"],
  history: [],
  favorites: [], // cityKey

  // maps:
  map: {
    "215854": {
      name: "Tel Aviv",
      key: "215854",
      countryName: "Israel",
      countryId: "IL"
    }
  } // map<cityKey, cityName>
};

function weatherReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case REMOVE_FROM_FAVORITES:
      state.favorites = state.favorites.filter(key => key !== payload);
      return { ...state };
    case ADD_TO_FAVORITES:
      if (state.favorites.indexOf(payload) === -1) {
        state.favorites.push(payload);
      }
      return { ...state };
    case REMOVE_FROM_HISTORY:
      state.history = state.history.filter(key => key !== payload);
      return { ...state };
    case ADD_TO_HISTORY:
      if (state.history.indexOf(payload)) {
        state.history.push(payload);
      }
      return { ...state };
    case SET_SELECTED_CITY:
      return { ...state, selectedCity: payload };
    case ADD_TO_MAP:
      if (state.ids.indexOf(payload.key) === -1) {
        state.ids.push(payload.key);
      }
      state.map[payload.key] = { ...payload };
      return { ...state };
    case TOGGLE_IS_FAHRENHEIT:
      return { ...state, isFahrenheit: !state.isFahrenheit };
    case SET_ON_PENDING:
      return { ...state, onPending: [...state.onPending, payload] }; // the payload is used as request id
    case SET_NOT_PENDING:
      return {...state, onPending: state.onPending.filter(requestId => requestId !== payload)};

    default:
      return state;
  }
}

export default weatherReducer;
