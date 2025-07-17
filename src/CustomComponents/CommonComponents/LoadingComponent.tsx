import { Loader2 } from "lucide-react";
import React from "react";
import clsx from "clsx";

interface LoadingComponentProps {
  IsLoading?: boolean;
}

export default function LoadingComponent({ IsLoading = false }: LoadingComponentProps) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 transition-opacity",
        {
          "opacity-100 pointer-events-auto": IsLoading,
          "opacity-0 pointer-events-none": !IsLoading,
        }
      )}
    >
      <Loader2 className="h-12 w-12 animate-spin text-white" />
    </div>
  );
}
