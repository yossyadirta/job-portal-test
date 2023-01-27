import JobListRow from "../components/JobListRow";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, fetchMoreJobs } from "../store/jobsAction";
import Loading from "../components/Loading.jsx";
import LoadingInfiniteScroll from "../components/LoadingInfiniteScroll";

export default function Home() {
  const dispatch = useDispatch();
  const { jobs, loading, loadingInfiniteScroll, error } = useSelector(
    (state) => state.jobs
  );

  const [filterFullTime, setFilterFullTime] = useState(false);
  const [inputSearch, setInputSearch] = useState({
    searchJobTitle: "",
    searchJobLocation: "",
  });
  const [currPage, setCurrPage] = useState(1);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setInputSearch({
      ...inputSearch,
      [name]: value,
    });
  };

  const handleChangeCheckbox = () => {
    setFilterFullTime(!filterFullTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchJobs(inputSearch, filterFullTime));
  };

  useEffect(() => {
    if (currPage !== 1) {
      dispatch(fetchMoreJobs(currPage));
    } else {
      dispatch(fetchJobs(inputSearch, filterFullTime));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, filterFullTime, currPage]);

  const handleScroll = () => {
    let height = document.documentElement.scrollHeight;
    let top = document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;

    if (windowHeight + top + 1 >= height) {
      setCurrPage((prev) => {
        if (error.error) {
          return prev;
        } else {
          return prev + 1;
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-col py-4 pt-8 px-40 text-left">
      <div className="py-12 pt-24 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-between items-end"
        >
          <div className="flex flex-col">
            <label className="pb-2 font-semibold">Job Description</label>
            <input
              type="text"
              value={inputSearch.searchJobTitle}
              name="searchJobTitle"
              onChange={handleChange}
              className="w-full form-control block px-4 py-2 mb-2 md:mb-0 md:mr-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:bg-[#1b83dd]-blue-600 focus:outline-none"
              placeholder="Search for a job title"
            />
          </div>
          <div className="flex flex-col">
            <label className="pb-2 font-semibold">Location</label>
            <input
              type="text"
              value={inputSearch.searchJobLocation}
              name="searchJobLocation"
              onChange={handleChange}
              className="w-full form-control block px-4 py-2 mb-2 md:mb-0 md:mr-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:bg-[#1b83dd]-blue-600 focus:outline-none"
              placeholder="Search for a job title"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  checked={filterFullTime}
                  name="filterFullTime"
                  id="flexCheckDefault"
                  onChange={handleChangeCheckbox}
                />
                <label
                  className="form-check-label inline-block text-gray-800 font-semibold"
                  htmlFor="flexCheckDefault"
                >
                  Full Time Only
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="p-2.5 px-4 text-md font-medium text-white bg-[#0086FF] rounded-md border border-[#1b83dd] hover:bg-[#1b83dd] focus:ring-4 focus:outline-none focus:ring-[#1b83dd]"
          >
            Search
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className="bg-white w-full p-6 shadow-lg mb-16">
        <h1 className="text-2xl font-bold">Job List</h1>
        <hr className="mt-6" />
        {jobs?.map((job, index) => {
          return <JobListRow key={index} job={job} />;
        })}

        {error.error ? (
          <>{loadingInfiniteScroll && <LoadingInfiniteScroll />}</>
        ) : (
          <div className="pt-4 ">
            <button
              type="button"
              className="mb-2 w-full inline-block px-6 py-2.5 bg-[#427FBE] text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
            >
              More Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
