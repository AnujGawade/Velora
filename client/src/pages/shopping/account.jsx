import AccountAddress from '@/components/shopping/address';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import accountImage from '../../assets/account-hero-image.png';
import ShopOrders from '@/components/shopping/orders';

const ShopAccount = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Banner Image */}
      <div className="relative h-[300px] md:h-[420px] w-full overflow-hidden">
        <img
          src={accountImage}
          alt="Account banner"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <ShopOrders />
            </TabsContent>

            <TabsContent value="address">
              <AccountAddress />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopAccount;
