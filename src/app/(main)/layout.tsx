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
import HomePageBody from "./components/HomePageBody";

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
                            <HomePageBody>{children}</HomePageBody>
                        </body>
                    </html>
                </SocketProvider>
            </BreadcrumbProvider>
        </ConfigProvider>
    );
}
