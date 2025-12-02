import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[12rem] grid-cols-3 gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  onClick,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
      description?: string;
  href: string;
  cta: string;
  onClick?: () => void;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-lg cursor-pointer border border-transparent",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles - Palette bleu/noir élégante
      "transform-gpu dark:bg-black dark:border-blue-900/30 dark:hover:border-blue-800/50 dark:[box-shadow:0_0_0_1px_rgba(59,130,246,.08),0_2px_8px_rgba(0,0,0,.6)] dark:hover:[box-shadow:0_0_0_1px_rgba(59,130,246,.15),0_4px_12px_rgba(0,0,0,.7)] transition-all duration-300",
      className,
    )}
    onClick={onClick}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-3 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-7 w-7 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-blue-400" />
      <h3 className="text-base font-semibold text-neutral-700 dark:text-gray-200">
        {name}
      </h3>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button 
        variant="ghost" 
        size="sm" 
        className="pointer-events-auto text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-950/20"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {cta}
        <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-blue-950/10 group-hover:dark:border-blue-800/30" />
  </div>
);

export { BentoCard, BentoGrid };

