import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import ClientSocketHandler from "../hooks/ClientTracker";
import Nav from "./layout/Nav";
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from "antd";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "The AJ Explorer",
  description: "The AJ Explorer",
  icons: {
    icon: "/icon.png",         
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body 
        className="text-[12px] font-primary antialiased"
        cz-shortcut-listen="true"
      >
        <ConfigProvider>
          <NextIntlClientProvider messages={messages}>
            <Nav />
            {children}
          </NextIntlClientProvider>
        </ConfigProvider>
        <ClientSocketHandler />
      </body>
    </html>
  );
}