import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDetailJob } from "../store/jobsAction";
import Loading from "../components/Loading.jsx";

export default function DetailJob() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailJob, loading } = useSelector((state) => state.jobs);

  const imgNotFound = "https://dummyimage.com/600x300/cfcdcf/000000.jpg";

  const handleGoBack = () => {
    return navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchDetailJob(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-[#f7faff] pt-28">
      <div className="pr-40 pl-40">
        <button className="flex pb-6 items-center" onClick={handleGoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#bebebe"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
          <span>
            <p className="text-lg font-semibold text-blue-500 pl-2"> Back </p>
          </span>
        </button>
        <div className="border bg-white rounded-md">
          <div className="container p-4 px-8 mx-auto text-left pb-8">
            <p className="font-semibold mt-4 text-gray-500">
              {detailJob?.type} /<span> {detailJob?.location}</span>
            </p>
            <h2 className="text-2xl font-bold pt-1 text-gray-800">
              {detailJob?.title}
            </h2>
            <hr className="my-8 h-px bg-gray-200 border-0"></hr>
            <div className="flex">
              <div
                className="pr-24"
                dangerouslySetInnerHTML={{ __html: detailJob.description }}
              />
              <div className="flex flex-col">
                <div className="flex flex-col shadow-xl p-4">
                  <p className="font-semibold mb-2">{detailJob.company}</p>
                  <hr className="font-semibold mb-4" />
                  <img
                    className="mb-4"
                    src={detailJob.company_logo}
                    alt={detailJob.company + "_logo"}
                    onError={(e) => {
                      e.currentTarget.src = imgNotFound;
                    }}
                  />
                  <Link to={detailJob.company_url} className="mb-2">
                    <span className="text-blue-500 underline">
                      {detailJob.company_url}
                    </span>
                  </Link>
                </div>
                <div className="mt-16 flex flex-col bg-[#FFFEF1] p-4 shadow-xl">
                  <p className="font-semibold mb-2">How to apply</p>
                  <hr className="font-semibold mb-2" />
                  <p
                    dangerouslySetInnerHTML={{ __html: detailJob.how_to_apply }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
