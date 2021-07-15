import { combineReducers } from "redux";
import progress from "./progress";
import volume from "./volume";
import player from "./player";
import items from "./items";

export default combineReducers({ progress, volume, player, items });
