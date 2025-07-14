interface TSubHeading {
  subHeading: string;
  align?: "left" | "center" | "right";
}

const SubHeading = ({ subHeading, align = "center" }: TSubHeading) => {
  return (
    <p
      className={`text-[16px] max-w-3xl lg:text-[18px] font-normal text-[#7683A3] ${
        align === "center"
          ? "text-center"
          : align === "left"
          ? "text-left"
          : "text-right"
      }`}
    >
      {subHeading}
    </p>
  );
};

export default SubHeading;
