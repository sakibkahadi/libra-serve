"use client";

import { ReactNode } from "react";
import Providers from "@/lib/Provider";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <Providers>{children}</Providers>;
}
