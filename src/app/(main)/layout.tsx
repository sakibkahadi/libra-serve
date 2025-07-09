import MainLayoutProvider from "@/CustomComponents/Layouts/MainLayoutProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <MainLayoutProvider>{children}</MainLayoutProvider>;
}
