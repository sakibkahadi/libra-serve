"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import PrimaryButton from "../CommonComponents/Buttons/PrimaryButton";

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
        imageUrl?: string;
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
      link: "/",
    },
  },
  {
    menus: [
      {
        label: "Home",
        link: "/",
      },
      {
        label: "Books",
        link: "/books",
      },
      {
        label: "Blogs",
        link: "/blog",
      },
      {
        label: "Contact Us",
        link: "/contact",
      },
    ],
  },
];

export default function Navbar() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    const menus = navbarData.find((item) => "menus" in item) as {
      menus: MenuItem[];
    };
    if (menus) setMenuData(menus.menus);
  }, []);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderMenuItems = (items: MenuItem[] | SubMenuItem[], depth = 0) => {
    return (
      <ul className={`pl-${depth * 4} flex flex-col gap-2`}>
        {items.map((item) => (
          <li key={item.label} className="text-[#1A314E]">
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
                {openMenus[item.label] &&
                  renderMenuItems(item.subMenus, depth + 1)}
              </div>
            ) : (
              <Link href={item.link || "#"}>{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mb-32">
      <div className="fixed top-4 w-full z-[999]">
        <div className="container mx-auto sm:px-4">
          <div className="bg-white rounded-lg py-4 px-5 flex items-center justify-between shadow">
            {/* Logo */}
            <div className="flex items-center">
              {"logo" in navbarData[0] && (
                <Link href={navbarData[0].logo.link || "/"}>
                  <div className="flex items-center gap-2">
                    {navbarData[0].logo.imageUrl && (
                      <img
                        src={navbarData[0].logo.imageUrl}
                        alt="logo"
                        className="h-8 w-8 object-contain"
                      />
                    )}
                    <span className="text-xl font-bold text-[#154D7E]">
                      {navbarData[0].logo.text}
                    </span>
                  </div>
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-6">
                  {menuData.map((item) => (
                    <NavigationMenuItem key={item.label}>
                      {item.subMenus ? (
                        <>
                          <NavigationMenuTrigger>
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="p-4 bg-white shadow-lg rounded">
                            <ul className="flex flex-col gap-2">
                              {item.subMenus.map((subItem) => (
                                <li key={subItem.label}>
                                  {subItem.subMenus ? (
                                    <div className="group relative">
                                      <span className="cursor-pointer group-hover:underline">
                                        {subItem.label}
                                      </span>
                                      <ul className="absolute left-full top-0 mt-0 ml-2 bg-white border rounded shadow-lg p-2 hidden group-hover:block w-48">
                                        {subItem.subMenus.map((child) => (
                                          <li key={child.label}>
                                            <Link
                                              href={child.link || "#"}
                                              className="block px-2 py-1 hover:bg-gray-100"
                                            >
                                              {child.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ) : (
                                    <Link
                                      href={subItem.link || "#"}
                                      className="block px-2 py-1 hover:bg-gray-100"
                                    >
                                      {subItem.label}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={item.link || "#"}
                          className="px-3 py-2 text-sm hover:underline"
                        >
                          {item.label}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex gap-4 items-center">
              <PrimaryButton
                buttonText="Login"
                bgColor="#154D7E"
                hoverColor="#1E5D99"
                clickColor="#103B61"
                textColor="#FFFFFF"
                width="121px"
                onClick={() => router.push("/login")}
              />
              <PrimaryButton
                buttonText="Get Started"
                bgColor="#2E7D32"
                hoverColor="#388E3C"
                clickColor="#1B5E20"
                textColor="#FFFFFF"
                width="121px"
                onClick={() => router.push("/signup")}
              />
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden ">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="bg-[#154D7E] text-white p-2 rounded">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent className="w-[80%] sm:w-[300px] z-[9999]">
                  <SheetHeader>
                    <SheetTitle className="text-[#154D7E] text-lg font-bold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="ml-4 mt-4  flex flex-col gap-3">
                    {renderMenuItems(menuData)}
                    <div className="sm:hidden flex gap-4 items-center">
                      <PrimaryButton
                        buttonText="Login"
                        bgColor="#154D7E"
                        hoverColor="#1E5D99"
                        clickColor="#103B61"
                        textColor="#FFFFFF"
                        width="121px"
                        onClick={() => router.push("/login")}
                      />
                      <PrimaryButton
                        buttonText="Get Started"
                        bgColor="#2E7D32"
                        hoverColor="#388E3C"
                        clickColor="#1B5E20"
                        textColor="#FFFFFF"
                        width="121px"
                        onClick={() => router.push("/signup")}
                      />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
