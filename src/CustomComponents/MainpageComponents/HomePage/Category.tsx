import MainHeading from "@/CustomComponents/CommonComponents/MainHeading";
import { TSection } from "./HomepageContainer";
import SubHeading from "@/CustomComponents/CommonComponents/SubHeading";
import CategoryCard from "@/CustomComponents/CommonComponents/Cards/CategoryCard";

const Category = ({category,categoryCard}:{category:TSection, categoryCard:TSection[]})=>{
    return (
        <div className="py-16 container mx-auto px-2 sm:px-20 ">
<section className="flex flex-col gap-5 justify-center items-center">
    <MainHeading heading={category.section_title} />
    <SubHeading subHeading={category.section_sub_title} />
</section>
<section className=" grid-cols-3 gap-12 max-w-7xl mx-auto mt-12 hidden lg:grid">
    {categoryCard?.map((cat) => (
          <CategoryCard
            key={cat.uuid}
            heading={cat.section_title}
            image={cat.image || ""}
            description={cat.section_sub_title} slug={cat.slug}
          />
        ))}
</section>
        </div>
    )
}
export default Category;