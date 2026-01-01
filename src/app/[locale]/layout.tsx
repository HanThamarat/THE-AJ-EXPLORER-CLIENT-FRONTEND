import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import ClientSocketHandler from "../hooks/ClientTracker";
import Nav from "./layout/Nav";
import { ConfigProvider } from "antd";
import ReduxProvider from "../hooks/reduxProvider";
import AuthProvider from "../hooks/auth-provider";
import { GoogleProvider } from "../hooks/google-provider";
import GoogleOneTap from "../hooks/google-sign";
import Footer from "./layout/Footer";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Toaster } from 'react-hot-toast';
import { Suspense } from "react";
import PageLoader from "../components/loader/pageLoader";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "The AJ Explorer",
  description: "The AJ Explorer",
  icons: {
    icon: "/favicon.ico",         
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
        className="text-[12px] font-primary text-gray-700 antialiased"
        cz-shortcut-listen="true"
      >
        <Suspense fallback={<PageLoader />}>
          <AntdRegistry>
            <AuthProvider>
              <GoogleProvider>
                <ConfigProvider>
                  <NextIntlClientProvider messages={messages}>
                    <ReduxProvider>
                      <GoogleOneTap />
                      <Nav />
                      <div className="w-full min-h-[100vh]">
                        {children}
                      </div>
                      <Footer />
                    </ReduxProvider>
                  </NextIntlClientProvider>
                </ConfigProvider>
              </GoogleProvider>
            </AuthProvider>
          </AntdRegistry>
          <ClientSocketHandler />
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}