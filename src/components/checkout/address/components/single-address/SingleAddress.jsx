import RadioInput from "@/components/shared/inputs/radio-input/RadioInput";
import { cn } from "@/utils/cn";

export default function SingleAddress({ data, selected, setSelected, button }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <RadioInput checked={selected} onChange={setSelected} />
      <div
        onClick={setSelected}
        className={cn(
          "flex justify-between items-center gap-2 grow border p-4 rounded-lg hover:!border-black cursor-pointer",
          selected && "!border-black"
        )}
      >
        <p className="font-semibold">
          {data?.address.length > 80
            ? data?.address?.slice(0, 80) + "..."
            : data?.address}
        </p>
        {button && button}
      </div>
    </div>
  );
}
