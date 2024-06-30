import Header from "../Header";

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


  

  return (
    <div className="w-full h-screen">
      <Header headerName="Settings" />
      <div className="relative w-full h-[90%] p-6">
        <div className="w-full h-full flex shadow-md rounded-md">
          <ul className="w-[20%] border-r py-6 pl-5 pr-8 flex flex-col gap-4">
            {
              comps.map((comp, index) => (
                <li key={index}>{comp.title}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
