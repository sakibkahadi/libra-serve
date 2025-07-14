"use client";
import PrimaryButton from "@/CustomComponents/CommonComponents/Buttons/PrimaryButton";
import { TBanner } from "./HomepageContainer";
import { useRouter } from "next/navigation";

const Banner = ({ banner }: { banner: TBanner }) => {
  const router = useRouter();
  return (
    <div className="flex container px-2 sm:px-20 mx-auto flex-col py-16 gap-6 items-center justify-center">
      <h1
        className="font-bold  text-[#14273F] leading-12 sm:leading-[64px] text-center"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }} // 40px–72px range
      >
        {banner?.section_title}
      </h1>

      <p
        className="text-[#154DA3] mt-2 lg:mt-10 text-center  font-medium max-w-3xl mx-auto"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }} // 16px–24px range
      >
        {banner?.section_sub_title}
      </p>
      <PrimaryButton
        buttonText="Get Started"
        bgColor="#2E7D32"
        hoverColor="#388E3C"
        clickColor="#1B5E20"
        textColor="#FFFFFF"
        width="221px"
        onClick={() => router.push("/signup")}
      />
    </div>
  );
};
export default Banner;
