
"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import Navbar from "../SharedComponents/Navbar";
import Footer from "../SharedComponents/Footer";

export default function MainLayoutProvider({children}:{children:ReactNode}) {
    const queryClient = new QueryClient()
  return (
    <div>
    <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="">
            {children}
        </div>
        <Footer />
    </QueryClientProvider>
    </div>
  );
} 