import { Link } from "react-router-dom";
import moment from "moment";

export default function JobListRow({ onScroll, listInnerRef, job }) {
  const date = moment(job?.created_at).fromNow();

  return (
    <div
      className="flex py-4 border-b justify-between"
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className="">
        <div className="flex flex-row items-center">
          <div>
            <Link to={`/${job?.id}`}>
              <h2 className="text-lg font-semibold text-[#407ac7] hover:underline hover:underline-offset-4">
                {job?.title}
              </h2>
            </Link>

            <div className="flex flex-wrap items-center">
              <div className="flex items-center mb-2 mr-2 text-sm text-gray-300 md:mb-0 hover:text-gray-700">
                <p className="inline-block mb-2 text-md font-semibold text-gray-400 hover:text-blue-600 mt-2">
                  {job?.company}
                </p>
              </div>
              <p className="text-lg text-gray-400">-</p>
              <div className="flex items-center mb-2 mr-4 text-sm text-[#60A345] md:mb-0 hover:text-gray-700 font-semibold">
                <p className="pl-1">{job?.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-right">
        <p>{job?.location}</p>
        <p className="mt-2 text-gray-400">{date}</p>
      </div>
    </div>
  );
}
