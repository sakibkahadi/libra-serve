import MainHeading from "@/CustomComponents/CommonComponents/MainHeading"
import { TSection } from "./HomepageContainer"
import SubHeading from "@/CustomComponents/CommonComponents/SubHeading"
import SplineAreaChart from "@/CustomComponents/Charts/SplineAreaChart"

const PopularCategory =({popularCategory}:{popularCategory:TSection})=>{
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const series = [
  {
    name: 'Website A',
    data: [20, 40, 50, 30, 30, 20, 30, 40, 50, 40, 30],
  },
  {
    name: 'Website B',
    data: [50, 40, 30, 40, 50, 60, 50, 40, 30, 40, 50],
  },
  {
    name: 'Website c',
    data: [53, 20, 50, 10, 40, 20, 50, 40, 30, 40, 50],
  },
];
  const colors = ['#f97316', '#0ea5e9', '#000000']; // Optional: orange and blue

    return (
<div className="py-16 container mx-auto px-2 sm:px-20">
    <section className="flex flex-col gap-5 justify-center items-center">
            <MainHeading heading={popularCategory?.section_title} />
            <SubHeading subHeading={popularCategory?.section_sub_title} />
        </section>
        {/* chart section */}
        <SplineAreaChart categories={categories} series={series} colors={colors} />

</div>
    )
}
export default PopularCategory

/**
 * create a line chart of mulitple or single line
 * 1) define a series of array of object where pass name and data(it is a array of number that line will show)
 * 2) define categories array of string that will show under the graph bottom
 * 3) define a color each color for each line
 */