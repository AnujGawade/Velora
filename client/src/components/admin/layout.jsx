import { Outlet } from 'react-router-dom';
import AdminSidebar from './sidebar';
import AdminHeader from './header';
import { useState } from 'react';

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#11191F]">
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* <AdminHeader setOpen={setOpenSidebar} /> */}
        <main className="h-full flex flex-col  p-4 md:p-6 m-1 md:m-2.5 rounded-xl bg-slate-200 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

{
  /* <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div> */
}
