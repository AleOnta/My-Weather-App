const initialState = {
  isLoading: true,
  weather: {
    toFetchGeo: "Milano",
    geoResult: {
      lat: 45.4641943,
      lon: 9.1896346,
    },
    toFetchWeather: "",
    weatherDailyResult: {},
    weatherWeeklyResult: {},
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LOCATION":
      return {
        ...state,
        ...state.isLoading,
        weather: {
          ...state.weather,
          toFetchGeo: action.payload,
        },
      };
    case "ADD_COORDINATES":
      return {
        ...state,
        ...state.isLoading,
        weather: {
          ...state.weather,
          geoResult: action.payload,
        },
      };
    case "ADD_WEATHER_RESULT":
      return {
        ...state,
        ...state.isLoading,
        weather: {
          ...state.weather,
          weatherDailyResult: action.payload,
        },
      };
    case "ADD_WEEKLY_RESULT":
      return {
        ...state,
        ...state.isLoading,
        weather: {
          ...state.weather,
          weatherWeeklyResult: action.payload,
        },
      };
    case "SET_LOAD":
      return {
        ...state,
        isLoading: action.payload,
        weather: {
          ...state.weather,
        },
      };
    default:
      return state;
  }
};
export default mainReducer;
