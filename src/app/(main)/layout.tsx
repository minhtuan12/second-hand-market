import type {Metadata} from "next";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import '../global.scss'
import Header from "@/app/(main)/components/Header";
import styles from './styles.module.scss'
import {ConfigProvider} from "antd";
import viVN from 'antd/locale/vi_VN';

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {

    return (
        <ConfigProvider locale={viVN}>
            <html lang="en">
            <body>
            <NextTopLoader color={'#ffda21'} height={2}/>
            <div className={'relative min-h-screen'}>
                <Header/>
                <div className={`min-h-screen relative top-[80px] ${styles.childrenWrap}`}>
                    {children}
                </div>
            </div>
            <ToastContainer/>
            </body>
            </html>
        </ConfigProvider>
    );
}