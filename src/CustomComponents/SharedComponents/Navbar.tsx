"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- Types ---
type SubMenuItem = {
  label: string;
  link?: string;
  subMenus?: SubMenuItem[];
};

type MenuItem = {
  label: string;
  link?: string;
  subMenus?: SubMenuItem[];
};

type NavbarData =
  | {
      logo: {
        text: string;
        imageUrl: string;
        link?: string;
      };
    }
  | {
      menus: MenuItem[];
    };

// --- Sample Data ---
export const navbarData: NavbarData[] = [
  {
    logo: {
      text: "LibrarySys",
      imageUrl: "/assets/logo.png",
      link: "/"
    }
  },
  {
    menus: [
      {
        label: "Home",
        link: "/"
      },
      {
        label: "About",
        link: "/about"
      },
      {
        label: "Books",
        subMenus: [
          {
            label: "All Books",
            link: "/books/all"
          },
          {
            label: "New Arrivals",
            link: "/books/new"
          },
          {
            label: "Categories",
            subMenus: [
              {
                label: "Fiction",
                link: "/books/categories/fiction"
              },
              {
                label: "Science",
                link: "/books/categories/science"
              },
              {
                label: "Technology",
                link: "/books/categories/technology"
              }
            ]
          }
        ]
      },
      {
        label: "Members",
        subMenus: [
          {
            label: "Register",
            link: "/members/register"
          },
          {
            label: "Login",
            link: "/members/login"
          }
        ]
      },
      {
        label: "Contact Us",
        link: "/contact"
      }
    ]
  }
];

export default function Navbar() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      const menus = navbarData.find((item) => "menus" in item) as {
        menus: MenuItem[];
      };
      if (menus) setMenuData(menus.menus);
    };

    fetchData();
  }, []);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Recursive menu rendering
  const renderMenuItems = (items: MenuItem[] | SubMenuItem[], depth = 0) => {
    return (
      <ul className={`pl-${depth * 4} flex flex-col gap-2`}>
        {items.map((item) => (
          <li key={item.label} className="text-[#1A314E] ">
            {item.subMenus ? (
              <div>
                <button
                  className="flex items-center gap-2 w-full"
                  onClick={() => toggleMenu(item.label)}
                >
                  <span>{item.label}</span>
                  {openMenus[item.label] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {openMenus[item.label] && renderMenuItems(item.subMenus, depth + 1)}
              </div>
            ) : (
              <Link href={item.link!}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="py-6 px-4 flex justify-between items-center">
      {/* Logo */}
      {"logo" in navbarData[0] && (
        <Link href={navbarData[0].logo.link || "/"}>
          <div className="flex items-center gap-2">
            <img
              src={navbarData[0].logo.imageUrl}
              alt="logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-[#154D7E]">
              {navbarData[0].logo.text}
            </span>
          </div>
        </Link>
      )}

      {/* Mobile Menu Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="bg-[#154D7E] text-white p-2 rounded">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[80%] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle className="text-[#154D7E] text-lg font-bold">
              Sakib
            </SheetTitle>
          </SheetHeader>

          <nav className=" ml-5 flex flex-col gap-3">
            {renderMenuItems(menuData)}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
