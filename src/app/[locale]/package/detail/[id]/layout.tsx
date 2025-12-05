import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The AJ Explorer",
  description: "The AJ Explorer",
};

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