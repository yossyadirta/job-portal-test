import JobListRow from "../components/JobListRow";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../store/jobsAction";
import Loading from "../components/Loading.jsx";

export default function Home() {
  const { jobs, loading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const [filterFullTime, setFilterFullTime] = useState(false);

  const [inputSearch, setInputSearch] = useState({
    searchJobTitle: "",
    searchJobLocation: "",
  });

  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  // const [prevPage, setPrevPage] = useState(0);
  // const [lastList, setLastList] = useState(false);

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
    dispatch(fetchJobs(inputSearch, filterFullTime, currPage));
  };

  const handleMoreJobsButton = (event) => {
    event.preventDefault();
    setCurrPage(currPage + 1);
    dispatch(fetchJobs(inputSearch, filterFullTime, currPage));
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchJobs(inputSearch, filterFullTime, currPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, filterFullTime, currPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-col py-4 pt-8 px-40 handphone:m-0 handphone:py-0 handphone:pt-8 handphone:px-16 text-left">
      <div className="py-12 pt-24">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row handphone:flex-wrap justify-between items-end"
        >
          <div className="flex flex-col handphone:w-full">
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
          <div className="flex flex-col handphone:w-full">
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
          <div className="flex flex-col justify-center handphone:w-full">
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
            className="p-2.5 px-4 text-md font-medium text-white bg-[#0086FF] rounded-md border border-[#1b83dd] hover:bg-[#1b83dd] focus:ring-4 focus:outline-none focus:ring-[#1b83dd] handphone:mt-4"
          >
            Search
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      <div className="bg-white w-full p-6 shadow-lg mb-16">
        <h1 className="text-2xl font-bold">Job List</h1>
        <hr className="mt-6" />
        {jobs?.map((job) => {
          return (
            <JobListRow
              key={job?.id}
              job={job}
              onScroll={onScroll}
              listInnerRef={listInnerRef}
            />
          );
        })}

        {jobs?.length < 10 ? (
          ""
        ) : (
          <div className="pt-4 ">
            <button
              onClick={handleMoreJobsButton}
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
