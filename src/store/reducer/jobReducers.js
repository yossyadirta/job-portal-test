import { FETCH_JOBS, LOADING, FETCH_DETAIL_JOB } from "../action";

const initialState = {
  jobs: [],
  detailJob: [],
  loading: true,
};

export default function jobReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case FETCH_DETAIL_JOB:
      return {
        ...state,
        detailJob: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
