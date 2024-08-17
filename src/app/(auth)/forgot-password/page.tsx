'use client'

import React, {useState} from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import Logo from '../../../../public/logo.png'
import InputWithLabel from "@/components/InputWithLabel";
import {Button} from "antd";
import '../styles.scss'
import Link from "next/link";

export default function ForgotPassword(): JSX.Element {
    const [email, setEmail] = useState<string>('')

    const handleChangeInput = (value: string): void => {
        setEmail(value)
    }

    return <div className={styles.forgotWrap}>
        <div className={styles.imageWrap}>
            <Image src={Logo} alt={'logo'} width={220} priority/>
        </div>
        <div className={styles.title}>
            Yêu cầu đặt lại mật khẩu
        </div>
        <div className={styles.forgotFormContent}>
            <div className={styles.inputWrap}>
                <InputWithLabel
                    isRequired
                    label={'Email'}
                    value={email}
                    onChange={e => handleChangeInput(e.target.value)}
                />
            </div>
        </div>
        <div className={`auth-button ${styles.btnWrap}`}>
            <Button type={'primary'} size={'large'}>Tiếp tục</Button>
        </div>
    </div>
}
