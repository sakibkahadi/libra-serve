interface THeading {
  heading: string;
}

const MainHeading = ({ heading }: THeading) => {
  return (
    <h1 className="font-bold text-[#1A314E] text-[32px] leading-[38px] lg:text-[46px] lg:leading-[48px]">
      {heading}
    </h1>
  );
};

export default MainHeading;
