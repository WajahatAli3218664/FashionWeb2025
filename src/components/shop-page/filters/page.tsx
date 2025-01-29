import React, { useState } from "react";
import { useRouter } from "next/router";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import DressStyleSection from "@/components/shop-page/filters/DressStyleSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";

const Filters = () => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<{
    category: string;
    price: { min: number; max: number };
    colors: string[];
    size: string[];
    style: string[];
  }>({
    category: "",
    price: { min: 0, max: 200 },
    colors: [],
    size: [],
    style: []
  });

  // Handler for category changes
  const handleCategoryChange = (category: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      category
    }));
  };

  // Handler for price changes
  const handlePriceChange = (min: number, max: number) => {
    setSelectedFilters(prev => ({
      ...prev,
      price: { min, max }
    }));
  };

  // Handler for color changes
  const handleColorChange = (colors: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      colors
    }));
  };

  // Handler for size changes
  const handleSizeChange = (sizes: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      size: sizes
    }));
  };

  // Handler for style changes
  const handleStyleChange = (styles: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      style: styles
    }));
  };

  // Apply filters handler
  const handleApplyFilters = () => {
    // Construct query parameters
    const query = {
      ...router.query,
      ...(selectedFilters.category && { category: selectedFilters.category }),
      ...(selectedFilters.colors.length > 0 && { colors: selectedFilters.colors.join(',') }),
      ...(selectedFilters.size.length > 0 && { sizes: selectedFilters.size.join(',') }),
      ...(selectedFilters.style.length > 0 && { styles: selectedFilters.style.join(',') }),
      minPrice: selectedFilters.price.min.toString(),
      maxPrice: selectedFilters.price.max.toString()
    };

    // Update URL with selected filters
    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true });
  };

  return (
    <div className="flex flex-col space-y-4">
      <hr className="border-t-black/10" />
      <CategoriesSection onCategorySelect={handleCategoryChange} />
      
      <hr className="border-t-black/10" />
      <PriceSection onChange={handlePriceChange} />
      
      <hr className="border-t-black/10" />
      <ColorsSection onChange={handleColorChange} />
      
      <hr className="border-t-black/10" />
      <SizeSection onChange={handleSizeChange} />
      
      <hr className="border-t-black/10" />
      <DressStyleSection onChange={handleStyleChange} />

      <Button
        type="button"
        className="bg-black w-full rounded-full text-sm font-medium py-4 h-12 text-white hover:bg-black/90"
        onClick={handleApplyFilters}
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default Filters;
