"use client";

import MainHeading from "@/CustomComponents/CommonComponents/MainHeading";
import SubHeading from "@/CustomComponents/CommonComponents/SubHeading";
import CategoryCard from "@/CustomComponents/CommonComponents/Cards/CategoryCard";
import { useGetCategory } from "@/hooks/home.hook";
import { TSection } from "./HomepageContainer";
import LoadingComponent from "@/CustomComponents/CommonComponents/LoadingComponent";

/* -------------------------------------------------------------------------- */
/* 💡 Define type for a single category item from API if not already defined. */
type TCategoryItem = {
  _id: string;
  category: string;
  category_image?: string;
};

interface CategoryProps {
  category: TSection;
  categoryCard: TSection[]; // (Not used in current render but kept for completeness)
}

/* -------------------------------------------------------------------------- */
/* ✅ Component                                                               */
const Category = ({ category }: CategoryProps) => {
  const { data: Category, isLoading } = useGetCategory();


  if (isLoading || !Category) {
    return (
     <LoadingComponent IsLoading />
    );
  }
    console.log(Category, "category");
  return (
    <div className="py-16 container mx-auto px-2 sm:px-20">
      <section className="flex flex-col gap-5 justify-center items-center">
        <MainHeading heading={category.section_title} />
        <SubHeading subHeading={category.section_sub_title} />
      </section>

      <section className="grid-cols-3 gap-12 max-w-7xl mx-auto mt-12 hidden lg:grid">
        {Category?.map((cat: TCategoryItem) => (
          <CategoryCard
            key={cat._id}
            heading={cat.category}
            image={cat.category_image || ""}
          />
        ))}
      </section>
    </div>
  );
};

export default Category;
