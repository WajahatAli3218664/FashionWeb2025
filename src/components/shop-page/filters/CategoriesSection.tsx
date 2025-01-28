import React from "react";
import { useRouter } from "next/router";
import { MdKeyboardArrowRight } from "react-icons/md";

type CategorySectionProps = {
  onCategorySelect: (category: string) => void;
};

const CategoriesSection = ({ onCategorySelect }: CategorySectionProps) => {
  const router = useRouter();
  const currentCategory = router.query.category as string;

  const categories = [
    { title: "T-shirts", slug: "t-shirts" },
    { title: "Shorts", slug: "shorts" },
    { title: "Shirts", slug: "shirts" },
    { title: "Hoodie", slug: "hoodie" },
    { title: "Jeans", slug: "jeans" },
  ];

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="font-medium text-sm mb-2">Categories</h3>
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onCategorySelect(category.slug)}
          className={`flex items-center justify-between py-2 transition-colors ${
            currentCategory === category.slug
              ? "text-blue-600"
              : "text-black/60 hover:text-black"
          }`}
        >
          {category.title}
          <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default CategoriesSection;