import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
};

export default function container({ children, className = "" }: Props) {
  return (
    <div
      className={`container mx-auto xl:max-w-[1216px] 2xl:!max-w-[1536px] ${className}`}
    >
      {children}
    </div>
  );
}
