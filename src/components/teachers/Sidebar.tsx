import navs from "../../utils/teachers/navs.json";
import { useNavigate, useLocation } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";

import Cookies from "js-cookie";
import Swal from "sweetalert2";

function Sidebar() {
  const route = useNavigate();
  const location = useLocation();

  const handleRouting = (path: string) => {
    route(path);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    sessionStorage.removeItem("card_user_token");
    sessionStorage.removeItem("card_user_user");
    route("/");

    Swal.fire({
      title: "Logged Out!",
      icon: "success",
      text: "You have been logged out"
    });
  };

  return (
    <div
      className={`h-full w-full overflow-hidden duration-300 relative`}
    >
      <ul className="flex flex-col gap-10 pt-16">
        {navs.map((nav, index) => (
            <div
              key={index}
              onClick={() => handleRouting(nav.path)}
              className="flex whitespace-nowrap gap-4 group border-blue-500 hover:border-l-4 px-5 hover:text-blue-500 transition-all ease duration-300 cursor-pointer"
            >
              <div>
                <img
                  src={location.pathname === nav.path ? nav.active : nav.image}
                  alt=""
                  className="min-w-6"
                />
              </div>
              <li className="hidden lg:block">{nav.name}</li>
            </div>
        ))}
      </ul>

      <button className='absolute left-5 bottom-[8%] shadow-sm text-red-600 px-4 py-2 rounded-md border border-[#d9d9d9] min-w-[fit-content] hidden lg:flex items-center gap-2' onClick={handleLogout}>
        Logout
        <FiLogOut />
      </button>
      <div className='absolute left-0 bottom-[8%] w-full grid place-items-center'>
        <button className='text-red-600 px-4 py-2 rounded-md border border-[#d9d9d9] min-w-[fit-content] block lg:hidden items-center gap-2' onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
