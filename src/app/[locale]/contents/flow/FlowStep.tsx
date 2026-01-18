import Image, { StaticImageData } from "next/image";

type FlowStepProps = {
  step: string;
  title: string;
  description: string;
  stepLabel: string;
  durationLabel: string;
  icon: StaticImageData;
  tone: "plum" | "indigo" | "amber" | "emerald";
};

const toneStyles: Record<FlowStepProps["tone"], { chip: string; ring: string; glow: string }> = {
  plum: {
    chip: "bg-[#2C0735]/10 text-[#2C0735]",
    ring: "ring-[#2C0735]/20",
    glow: "from-[#2C0735]/10 to-transparent",
  },
  indigo: {
    chip: "bg-[#613DC1]/12 text-[#3F2A8B]",
    ring: "ring-[#613DC1]/25",
    glow: "from-[#613DC1]/12 to-transparent",
  },
  amber: {
    chip: "bg-amber-100 text-amber-800",
    ring: "ring-amber-200",
    glow: "from-amber-100/70 to-transparent",
  },
  emerald: {
    chip: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-200",
    glow: "from-emerald-100/70 to-transparent",
  },
};

export default function FlowStep({
  step,
  title,
  description,
  stepLabel,
  durationLabel,
  icon,
  tone,
}: FlowStepProps) {
  const styles = toneStyles[tone];

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/70 bg-white p-[22px] shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow}`} />
      <div className="relative flex items-start gap-[14px]">
        <div
          className={`flex h-[46px] w-[46px] items-center justify-center rounded-[14px] ${styles.chip} ring-1 ${styles.ring}`}
        >
          <Image src={icon} alt="" className="h-[24px] w-[24px]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-[10px]">
            <span className="rounded-full bg-black/5 px-[10px] py-[2px] text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-600">
              {stepLabel} {step}
            </span>
            <span className="text-[14px] font-medium text-gray-500">{durationLabel}</span>
          </div>
          <h3 className="mt-[10px] text-[18px] font-semibold text-gray-900 md:text-[20px]">
            {title}
          </h3>
          <p className="mt-[6px] text-[14px] text-gray-600 md:text-[15px]">{description}</p>
        </div>
      </div>
    </div>
  );
}
