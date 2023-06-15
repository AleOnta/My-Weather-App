export const setLoad = (bool) => ({
  type: "SET_LOAD",
  payload: bool,
});

export const setCelsius = () => ({
  type: "SET_CELSIUS",
  payload: "cel",
});

export const setFarheneit = () => ({
  type: "SET_FARHENEIT",
  payload: "far",
});

export const setWeather = (values) => ({
  type: "ADD_WEATHER_RESULT",
  payload: values,
});

export const addLocation = (input) => ({
  type: "ADD_LOCATION",
  payload: input,
});

export const setCoordinates = (values) => ({
  type: "ADD_COORDINATES",
  payload: values,
});

export const setWeeklyWeather = (values) => ({
  type: "ADD_WEEKLY_RESULT",
  payload: values,
});

export const setAllWeekWeather = (values) => ({
  type: "ADD_ALL_WEEK_WEATHER",
  payload: values,
});
