import { combineReducers } from "redux";
import { buttonsReducer } from "./buttonsReducer";
import { usersInfoReducer } from "./usersInfoReducer";

export const rootReducer = combineReducers({
  switch: buttonsReducer,
  usersInfo: usersInfoReducer
});
