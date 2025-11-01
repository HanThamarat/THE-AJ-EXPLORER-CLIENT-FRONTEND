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
import ReduxProvider from "../hooks/reduxProvider";
import AuthProvider from "../hooks/auth-provider";
import { GoogleProvider } from "../hooks/google-provider";
import GoogleOneTap from "../hooks/google-sign";
import Footer from "./layout/Footer";

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

  console.log(process.env.NEXT_PUBLIC_AUTH_URL);
  

  return (
    <html lang={locale}>
      <body 
        className="text-[12px] font-primary antialiased"
        cz-shortcut-listen="true"
      >
        <AuthProvider>
          <GoogleProvider>
            <ConfigProvider>
              <NextIntlClientProvider messages={messages}>
                <ReduxProvider>
                  <GoogleOneTap />
                  <Nav />
                  <div className="w-full">
                    {children}
                  </div>
                  <Footer />
                </ReduxProvider>
              </NextIntlClientProvider>
            </ConfigProvider>
          </GoogleProvider>
        </AuthProvider>
        <ClientSocketHandler />
      </body>
    </html>
  );
}