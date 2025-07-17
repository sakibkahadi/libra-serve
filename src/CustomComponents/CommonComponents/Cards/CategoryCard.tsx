"use client"
import React from "react";

import { useRouter } from "next/navigation";

interface TCategoryCard {
  heading: string;

  image: string;
  uuid?: string;
  
}

const CategoryCard = ({ heading,  image, }: TCategoryCard) => {
    const router = useRouter()
  return (
    <div onClick={() => router.push(`/books/category/${heading}`)} className="flex flex-col items-center px-4 py-5 rounded-[24px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)] hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4 ">
        <img className="rounded-xl" src={image} alt={heading} />
      </div>
      <h1 className="text-black text-center  font-medium text-[clamp(18px,4vw,24px)] leading-[clamp(26px,5vw,32px)] my-2">
        {heading.split(" ")[0]} <br />
        {heading.split(" ")[1]}
      </h1>
      {/* <p className="text-[#00000080] text-center  font-normal text-[clamp(14px,4vw,18px)] leading-[clamp(16px,5vw,18px)]">
        {description}
      </p> */}
      {/* <div className="w-full h-full flex justify-end itee">
          <PrimaryButton
        buttonText="Explore"
        bgColor="#154D7E"
                hoverColor="#1E5D99"
                clickColor="#103B61"
                textColor="#FFFFFF"
        width="100%"
        
      />
      </div> */}
    </div>
  );
};

export default CategoryCard;
