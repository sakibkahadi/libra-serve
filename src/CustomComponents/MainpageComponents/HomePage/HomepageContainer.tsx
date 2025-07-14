import Banner from "./Banner";
import Category from "./Category";

export interface TBanner {
  section_title: string;
  section_sub_title: string;
}
export interface TSection {
  position?: number;
  uuid: number;
  section_title: string;
  section_sub_title: string;
  image?:string;
  meta_tag?:string;
  meta_description?:string;
  status?:string;
  slug?:string;
}
export default function HomepageContainer() {
  const bannerData: TBanner[] = [
    {
      section_title: "Access Thousands of Books Anytime, Anywhere You Are",
      section_sub_title:
        "Manage your personal library, borrow with ease, and explore your next favorite read — all in one platform.",
    },
  ];
  const category: TSection[] = [
    {
      uuid: 1,
      section_title: "Explore by Category",
      section_sub_title:
        "Browse books by genres and topics that interest you — from timeless classics to the latest tech reads.",
      
    },
  ];
  const categoryCard : TSection[] =[
  
  {
    uuid:1,
    position: 1,
    section_title: "Fiction",
    section_sub_title: "Stories that spark imagination and emotion.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    slug: "fiction",
  },
  {    uuid:2,
    position: 2,
    section_title: "Science",
    section_sub_title: "Discover the laws of nature and the universe.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981d",
    slug: "science",
  },
  {    uuid:3,
    position: 3,
    section_title: "Technology",
    section_sub_title: "Explore programming, AI, and the digital world.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    slug: "technology",
  },
  {     uuid:4,
    position: 4,
    section_title: "History",
    section_sub_title: "Dive into the past and uncover its stories.",
    image: "https://images.unsplash.com/photo-1549887534-298f745a36c5",
    slug: "history",
  },
  {
        uuid:5,
    position: 5,
    section_title: "Self-Help",
    section_sub_title: "Books to guide, motivate, and inspire personal growth.",
    image: "https://images.unsplash.com/photo-1515162305280-6de57d6340a0",
    slug: "self-help",
  },
  {
    uuid:6,
    position: 6,
    section_title: "Biographies",
    section_sub_title: "Explore the lives of influential figures.",
    image: "https://images.unsplash.com/photo-1588776814546-ec5f29c0f4c8",
    slug: "biographies",
  },
];


  return (
    <div className="">
      <Banner banner={bannerData[0]} />
    <div className="bg-[#D8E6F3]">
          <Category  categoryCard={categoryCard} category={category[0]} />
    </div>
    </div>
  );
}
