'use client'

import {useSelector} from "react-redux";
import {RootState} from "@/store/configureStore";
import styles from './styles.module.scss'
import Link from "next/link";

export default function Breadcrumb({className}: { className?: string }) {
    const pageTitle = useSelector((state: RootState) => state.app.pageTitle)
    const breadcrumb = useSelector((state: RootState) => state.app.breadcrumb)
    const handleRenderItemBreadCrumb = (index: number, item: { path: string, name: string }) => {
        switch (index) {
            case 0:
                return (
                    <><Link href={'/'} className={'hover:decoration-transparent'}>
                        <span className={`${styles.text} ${breadcrumb.length > 1 ? styles.activeText : ''}`}>
                            Trang chủ
                        </span>
                    </Link> - </>
                );
            case breadcrumb.length - 1:
                return (
                    <span className={`${styles.text}`}>
                        {item.name}
                    </span>
                )
            default:
                return (
                    <><Link href={item.path} className={'hover:decoration-transparent'}>
                        <span className={`${styles.text} ${styles.activeText}`}>
                            {item.name}
                        </span>
                    </Link> - </>
                );
        }
    }

    return <div className={className}>
        <div className={'text-[22px] font-semibold'}>{pageTitle}</div>
        <div className={styles.breadcrumbWrap}>
            {
                breadcrumb.map((item: { name: string, path: string }, index: number) => {
                    return <span key={index}>{(handleRenderItemBreadCrumb(index, item))}</span>
                })
            }
        </div>
    </div>
}
