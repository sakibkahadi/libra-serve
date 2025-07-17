
"use client"
import { getBooks } from "@/services/Books";

import { useQuery } from "@tanstack/react-query";

// by mistake i namne this home page but this will show all the page
export const useGetBooks = () => {
    return useQuery({
      queryKey: ["GET_Books"],
      queryFn: async () => getBooks(),
    });
  };