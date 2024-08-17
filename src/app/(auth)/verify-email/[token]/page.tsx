'use client'

import React, {useEffect, useState} from "react";
import {Button, Result, Spin} from "antd";
import '../../styles.scss'
import Link from "next/link";
import styles from './styles.module.scss'

export default function VerifyEmail({params}: { params: { token: string } }): JSX.Element {
    const [result, setResult] = useState<string>('')
    const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false)

    useEffect(() => {
        // TODO: request verify email
    }, [params?.token])

    return <>
        {
            isLoadingRequest ? <Spin size={"large"}/> :
                <Result
                    status="success"
                    title="Xác thực email thành công!"
                    extra={[
                        <div key="console" className={styles.redirectBtnWrap}>
                            <Link href={'/login'} className={`auth-button redirect-btn`}>
                                <Button type="primary" size={"large"}>
                                    Đăng nhập ngay
                                </Button>
                            </Link>
                        </div>
                    ]}
                />
        }
    </>
}
