import { combineReducers } from "redux";
import progress from "./progress";
import volume from "./volume";
import player from "./player";

export default combineReducers({ progress, volume, player });
