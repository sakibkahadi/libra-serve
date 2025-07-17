
"use client"
import { getCategory } from "@/services/Category";
import { useQuery } from "@tanstack/react-query";

// by mistake i namne this home page but this will show all the page
export const useGetCategory = () => {
    return useQuery({
      queryKey: ["GET_Category"],
      queryFn: async () => getCategory(),
    });
  };