import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/Hero_image_1.png';
import bannerTwo from '../../assets/Hero_image_2.png';
import {
  ArrowRight,
  Award,
  Baby,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  Footprints,
  PersonStanding,
  Shirt,
  ShirtIcon,
  ShoppingBag,
  Watch,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from '@/store/shop/products-slice';
import ShopProductTile from '@/components/shopping/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCartItems } from '@/store/shop/cart-slice';
import { toast } from 'sonner';
import ProductDetails from '@/components/shopping/product-details';

const categories = [
  { id: 'men', label: 'Men', icon: Shirt },
  { id: 'women', label: 'Women', icon: PersonStanding },
  { id: 'kids', label: 'Kids', icon: Baby },
  { id: 'accessories', label: 'Accessories', icon: Watch },
  { id: 'footwear', label: 'Footwear', icon: Footprints },
];

const brands = [
  { id: 'nike', label: 'Nike', icon: Flame }, // Energy / sports
  { id: 'adidas', label: 'Adidas', icon: Award }, // Performance
  { id: 'puma', label: 'Puma', icon: Shirt }, // Apparel
  { id: 'levi', label: "Levi's", icon: BadgeCheck }, // Quality
  { id: 'zara', label: 'Zara', icon: ShoppingBag }, // Fashion
  { id: 'hm', label: 'H&M', icon: ShoppingBag },
];

const ShopHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const slides = [bannerOne, bannerTwo];
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [item.id],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddToCart = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItems(user?.id));
        toast('Product added to the cart Successfully');
      }
    });
  };

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Slider */}
      <div className="relative w-full h-[800px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image */}
            <img
              src={slide}
              alt="Hero banner"
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay (optional but recommended) */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  New Season Collection
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  Discover styles made for every moment
                </p>

                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-200 hover:text-black cursor-pointer"
                >
                  Shop Now
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleNavigateToListingPage(item, 'category')}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{item.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleNavigateToListingPage(item, 'brand')}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{item.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((item) => (
                  <ShopProductTile
                    key={item._id}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                    product={item}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        setOpen={setOpenDetailsDialog}
        open={openDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShopHome;
