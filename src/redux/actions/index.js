export const setLoad = (bool) => ({
  type: "SET_LOAD",
  payload: bool,
});

export const setWeather = (value) => ({
  type: "ADD_WEATHER_RESULT",
  payload: value,
});

export const addLocation = (input) => ({
  type: "ADD_LOCATION",
  payload: input,
});

export const setCoordinates = (values) => ({
  type: "ADD_COORDINATES",
  payload: values,
});
