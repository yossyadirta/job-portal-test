import { FETCH_JOBS, FETCH_DETAIL_JOB, LOADING } from "./action";

export function setLoading(payload) {
  return (dispatch) => {
    dispatch({ type: LOADING, payload });
  };
}

export function fetchJobs(search, fulltime, page) {
  if (
    !page &&
    !fulltime &&
    (!search.searchJobLocation || !search.searchJobTitle)
  ) {
    page = 1;
  }

  let page_url = `?page=${page}`;
  let jobTitle_url = "";
  let jobLocation_url = "";
  let fulltime_url = "false";
  let search_url = "";

  if (fulltime || search.searchJobLocation || search.searchJobTitle) {
    let arr = [];
    page_url = "?";

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
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json${page_url}${search_url}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error({ msg: "error" });
        }
        return res.json();
      })
      .then((data) => dispatch({ type: FETCH_JOBS, payload: data }))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
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
