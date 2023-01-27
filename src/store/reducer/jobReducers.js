import {
  FETCH_JOBS,
  FETCH_MORE_JOBS,
  LOADING,
  LOADING_INFINITE_SCROLL,
  FETCH_DETAIL_JOB,
  ERROR,
} from "../action";

const initialState = {
  jobs: [],
  detailJob: [],
  loading: true,
  loadingInfiniteScroll: true,
  error: {},
};

export default function jobReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case FETCH_MORE_JOBS:
      const { jobs } = state;
      return {
        ...state,
        jobs: [...jobs, ...action.payload],
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
    case LOADING_INFINITE_SCROLL:
      return {
        ...state,
        loadingInfiniteScroll: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
