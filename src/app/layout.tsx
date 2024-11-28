import React from "react";
import './global.scss'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {StoreProvider} from "@/store/StoreProvider";
import AddStyledComponentRegistry from "@/components/AddStyledComponentsRegistry";

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default function RootLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }) {
    return (
        <StoreProvider>
            <html lang="en">
            <body className={'scrollbar-light'}>
            <AddStyledComponentRegistry>{children}</AddStyledComponentRegistry>
            </body>
            </html>
        </StoreProvider>
    )
}
