import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const GoldBentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[14rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { GoldBentoGrid };

