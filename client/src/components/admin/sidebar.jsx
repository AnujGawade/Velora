import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { House, LayoutPanelLeft, LogOut, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/auth-slice';

const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: House,
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: ShoppingCart,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: LayoutPanelLeft,
  },
];

const MenuItems = ({ setOpen = undefined }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-full flex flex-col mt-8">
      {/* Sidebar links */}
      <nav className="flex flex-col gap-2">
        {adminSidebarMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen?.(false); // safe optional call
            }}
            className="flex text-lg items-center gap-4 rounded-md px-2 py-1 text-gray-200/80 hover:text-black hover:bg-slate-200 cursor-pointer"
          >
            <menuItem.icon size={24} />
            <span>{menuItem.label}</span>
          </div>
        ))}
      </nav>

      {/* Logout button at bottom */}
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="mt-auto flex items-center gap-4 text-lg px-2 py-1 text-gray-200/80 hover:text-black hover:bg-slate-200"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </Button>
    </div>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-[#11191F]">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="text-xl text-white font-extrabold">
                Velora
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-56 lg:flex flex-col bg-[#11191F] p-6">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <h1 className="text-xl text-white font-extrabold">Velora</h1>
        </div>

        {/* Notice: NO setOpen on desktop */}
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
