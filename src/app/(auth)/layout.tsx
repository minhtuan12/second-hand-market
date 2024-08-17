import type {Metadata} from "next";
import React from "react";
import {ToastContainer} from "react-toastify";
import styles from './styles.module.scss'
import NextTopLoader from "nextjs-toploader";
import '../global.scss'

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
        <html lang="en" className={styles.layoutWrap}>
        <body>
        <div className={styles.authWrap}>
            <NextTopLoader color={'#f80'} height={2}/>
            {children}
            <ToastContainer/>
        </div>
        </body>
        </html>
    );
}
