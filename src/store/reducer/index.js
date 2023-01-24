import { combineReducers } from "redux";
import jobReducers from "./jobReducers";

const rootReducer = combineReducers({
  jobs: jobReducers,
});

export default rootReducer;
