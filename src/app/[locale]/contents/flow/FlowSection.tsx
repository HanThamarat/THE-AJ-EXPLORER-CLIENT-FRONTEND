import Image from "next/image";
import FlowStep from "./FlowStep";
import compass from "@/app/assets/images/svg/compass-03.svg";
import featured from "@/app/assets/images/svg/featured.svg";
import booking from "@/app/assets/images/svg/booking.svg";
import creditCard from "@/app/assets/images/svg/credit-card.svg";
import glow from "@/app/assets/images/img/attraction.jpg";
import { useTranslations } from "next-intl";

export default function FlowSection() {
  const t = useTranslations("home_flow");

  const steps = [
    {
      step: "01",
      title: t("steps.explore.title"),
      description: t("steps.explore.description"),
      icon: compass,
      tone: "plum",
    },
    {
      step: "02",
      title: t("steps.choose.title"),
      description: t("steps.choose.description"),
      icon: featured,
      tone: "indigo",
    },
    {
      step: "03",
      title: t("steps.pay.title"),
      description: t("steps.pay.description"),
      icon: creditCard,
      tone: "amber",
    },
    {
      step: "04",
      title: t("steps.enjoy.title"),
      description: t("steps.enjoy.description"),
      icon: booking,
      tone: "emerald",
    },
  ] as const;

  return (
    <section className="relative mt-[30px] py-[40px] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1FB] via-white to-white" />
      <div className="relative w-full px-[20px] 2xl:mx-auto 2xl:max-w-7xl 2xl:px-0">
        <div className="grid gap-[30px] md:grid-cols-[1.1fr_1fr] md:items-center">
          <div className="space-y-[16px]">
            <span className="inline-flex w-fit items-center gap-[8px] rounded-full bg-[#2C0735]/10 px-[14px] py-[6px] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#2C0735]">
              {t("eyebrow")}
            </span>
            <h2 className="text-[28px] font-semibold text-gray-900 md:text-[36px]">
              {t("title")}
            </h2>
            <p className="text-[15px] text-gray-600 md:text-[16px]">
              {t("subtitle")}
            </p>
            <div className="flex items-center gap-[12px] rounded-[18px] border border-white/70 bg-white p-[12px] shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <Image
                src={glow}
                alt={t("card.alt")}
                className="h-[64px] w-[90px] rounded-[14px] object-cover"
              />
              <div>
                <p className="text-[14px] font-semibold text-gray-900">{t("card.title")}</p>
                <p className="text-[13px] text-gray-600">{t("card.description")}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-[16px] md:grid-cols-1">
            {steps.map((item) => (
              <FlowStep
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
                stepLabel={t("step_label")}
                durationLabel={t("duration_label")}
                icon={item.icon}
                tone={item.tone}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
