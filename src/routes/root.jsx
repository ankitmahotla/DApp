import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
export default function Root() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}
