import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/home-1.jpeg';
import bannerTwo from '../../assets/home-2.jpg';
import bannerThree from '../../assets/home-3.jpeg';
import {
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
import { fetchAllFilteredProducts } from '@/store/shop/products-slice';
import ShopProductTile from '@/components/shopping/product-tile';
import { useNavigate } from 'react-router-dom';

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
  const { productList } = useSelector((state) => state.shopProducts);
  const slides = [bannerOne, bannerTwo, bannerThree];

  const handleNavigateToListingPage = (item, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [item.id],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            className={`${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length,
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
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
                  <ShopProductTile key={item._id} product={item} />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopHome;
