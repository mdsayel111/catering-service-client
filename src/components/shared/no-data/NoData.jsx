import { cn } from "@/utils/cn";
import Image from "next/image";

export default function NotData({ text, containerClassName }) {
  return (
    <div
      className={cn(
        "w-full h-[50vh] lg:h-[70vh] flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <Image
        src="/images/no-data.png"
        alt="404"
        className="w-[200px] lg:w-[300px] mb-4"
        width={300}
        height={300}
      />
      <p className="text-center text-2xl text-gray-900 font-medium p-4">
        No {text} found
      </p>
    </div>
  );
}
