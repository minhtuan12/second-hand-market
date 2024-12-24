import type { Metadata } from "next";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "../global.scss";
import Header from "@/app/(main)/components/Header";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { BreadcrumbProvider } from "@/app/context/BreadcrumbContext";
import { fetchRegions } from "@/actions/public";
import { SocketProvider } from "../context/SocketContext";

export const metadata: Metadata = {
    title: "Chợ đồ cũ",
    description: "Chợ đồ cũ",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await fetchRegions();

    return (
        <ConfigProvider locale={viVN}>
            <BreadcrumbProvider>
                <SocketProvider>
                    <html lang="en">
                        <head>
                            <meta
                                name="google-site-verification"
                                content="WrMLArTYh9O6DDKmtiQbnMpHvgiBcnRX12NQhf3cOeU"
                            />
                        </head>
                        <body>
                            <NextTopLoader
                                color={"#ffda21"}
                                height={2}
                                speed={100}
                            />
                            <div className={"relative min-h-screen"}>
                                <Header />
                                <div
                                    className={`min-h-[calc(100vh_-_80px)] relative top-[80px] py-5 bg-[#f4f4f4] px-[16px] 2xl:px-[200px] xl:px-[200px] lg:px-[100px] md:px-[50px]`}
                                >
                                    {children}
                                </div>
                            </div>
                            <ToastContainer />
                        </body>
                    </html>
                </SocketProvider>
            </BreadcrumbProvider>
        </ConfigProvider>
    );
}
