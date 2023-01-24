import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Index() {
  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <Navbar />
      <main className="h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
