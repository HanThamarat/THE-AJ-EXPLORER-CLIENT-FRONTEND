import { AxiosInstance } from "@/app/hooks/axiosInstance";


type MetaProps = {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ packageName?: string; provinceName?: string }>;
};

export async function generateMetadata({ params }: MetaProps) {
  const { id, locale } = await params;
  const data: any = await AxiosInstance.get(`/client/package/package_detail/${id}`);

  if (!data) {
    return {
      title: "Package not found",
    };
  }

  const isTH = locale === "th";

  const title = isTH
    ? `${data.data.body.packageName} | แพ็กเกจท่องเที่ยว`
    : `${data.data.body.packageName} | Travel Package`;

  const description = data.data.body.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.data.body.packageImage?.length
        ? [data.data.body.packageImage[0]]
        : [],
    },
  };
}


type Props = {
  children: React.ReactNode;
};

export default function PackageDetailLayout({
    children
}: Props) {
    return (
        <>
            {children}
        </>
    );
}