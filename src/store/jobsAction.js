import {
  FETCH_JOBS,
  FETCH_MORE_JOBS,
  FETCH_DETAIL_JOB,
  LOADING,
  LOADING_INFINITE_SCROLL,
  ERROR,
} from "./action";

export function setLoading(payload) {
  return (dispatch) => {
    dispatch({ type: LOADING, payload });
  };
}

export function setLoadingInfiniteScroll(payload) {
  return (dispatch) => {
    dispatch({ type: LOADING_INFINITE_SCROLL, payload });
  };
}

export function fetchJobs(search, fulltime) {
  let jobTitle_url = "";
  let jobLocation_url = "";
  let fulltime_url = "false";
  let search_url = "";

  if (fulltime || search.searchJobLocation || search.searchJobTitle) {
    let arr = [];

    if (search.searchJobTitle) {
      jobTitle_url = `description=${search.searchJobTitle}`;
      arr.push(jobTitle_url);
    } else {
      jobTitle_url = "";
    }

    if (search.searchJobLocation) {
      jobLocation_url = `location=${search.searchJobLocation}`;
      arr.push(jobLocation_url);
    } else {
      jobLocation_url = "";
    }

    if (fulltime) {
      fulltime_url = `type=${fulltime_url.toString()}`;
      arr.push(fulltime_url);
    } else {
      fulltime_url = "";
    }
    let result = arr.join("&");
    search_url = `${result}`;
  } else {
    search_url = "";
  }

  return (dispatch) => {
    fetch(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=1&${search_url}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error({ msg: "error" });
        }
        return res.json();
      })
      .then((data) => dispatch({ type: FETCH_JOBS, payload: data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }))
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export function fetchMoreJobs(page) {
  return (dispatch) => {
    fetch(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${page}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error({ msg: "Error Fetch" });
        }
        return res.json();
      })
      .then((data) => dispatch({ type: FETCH_MORE_JOBS, payload: data }))
      .catch((error) => {
        dispatch({ type: ERROR, payload: { error } });
      })
      .finally(() => {
        dispatch(setLoadingInfiniteScroll(false));
      });
  };
}

export function fetchDetailJob(id) {
  return (dispatch) => {
    fetch(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error({ msg: "error" });
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: FETCH_DETAIL_JOB, payload: data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}
