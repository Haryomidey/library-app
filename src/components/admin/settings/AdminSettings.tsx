import { useState } from "react";
import Header from "../Header";
import Notification from "./Notification";
import Communication from "./Communication";

function AdminSettings() {

  const comps = [
    {
      title: 'My Profile',
    },
    {
      title: 'Security',
    },
    {
      title: 'Data Export',
    },
    {
      title: 'Communication',
    },
    {
      title: 'Notification',
    },
    {
      title: 'Delete Account',
    }
  ]


  const [active, setActive] = useState<number>(0);

  const handleSetActive = (index: number) => {
    setActive(index)
  }

  return (
    <div className="w-full h-screen">
      <Header headerName="Settings" />
      <div className="relative w-full h-[90%] p-6">
        <div className="w-full h-full grid grid-cols-12 shadow-md rounded-md">
          <ul className="col-span-2 border-r py-6 pl-5 pr-8 flex flex-col gap-2">
            {
              comps.map((comp, index) => (
                <li 
                  key={index}
                  onClick={() => handleSetActive(index)}
                  className={`cursor-pointer px-6 py-2 rounded-md ${active === index ? 'bg-[#D6E2F9] text-[#2B5BFC]' : ''} `}
                >{comp.title}</li>
              ))
            }
          </ul>

          <div className="col-span-10 p-5">
            {active === 3 && <Communication />}
            {active === 4 && <Notification />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
