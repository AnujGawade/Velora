import ProductFilter from '@/components/shopping/filter';
import ShopProductTile from '@/components/shopping/product-tile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sortOptions } from '@/config';
import { fetchAllFilteredProducts } from '@/store/shop/products-slice';
import { ArrowUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const ShopListing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',');

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join('&');
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilters = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    console.log(cpyFilters);
    setFilters(cpyFilters);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
  };

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || '');
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters} />

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShopProductTile key={productItem._id} product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShopListing;
