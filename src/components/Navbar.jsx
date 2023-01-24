import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between mx-auto px-44 py-4 items-center bg-[#427FBE] fixed top-0 z-30 y w-screen left-0 border-b border-gray-200">
      <div className="-ml-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl text-white">
            <span className="font-bold">Github</span> Jobs
          </h1>
        </Link>
      </div>
      {localStorage.access_token && (
        <div className="flex items-end">
          <button
            onClick={handleLogout}
            className="text-[#427FBE] hover:text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 border border-[#427FBE] focus:outline-none font-medium rounded-md text-sm px-6 py-3 text-center"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
