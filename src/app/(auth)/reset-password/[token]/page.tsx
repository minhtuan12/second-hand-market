'use client'

import React, {useState} from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import Logo from '../../../../../public/logo.png'
import InputWithLabel from "@/components/InputWithLabel";
import {Button} from "antd";
import '../../styles.scss'

export default function ResetPassword({params}: { params: { token: string } }): JSX.Element {
    const [newPassword, setNewPassword] = useState<string>('')

    const handleChangeInput = (value: string): void => {
        setNewPassword(value)
    }

    const handleSubmitResetPassword = () => {
        const token: string = params?.token
        // TODO: request reset password
    }

    return <div className={styles.forgotWrap}>
        <div className={styles.imageWrap}>
            <Image src={Logo} alt={'logo'} width={220} priority/>
        </div>
        <div className={styles.title}>
            Đặt lại mật khẩu
        </div>
        <div className={styles.forgotFormContent}>
            <div className={styles.inputWrap}>
                <InputWithLabel
                    isRequired
                    label={'Mật khẩu mới'}
                    value={newPassword}
                    onChange={e => handleChangeInput(e.target.value)}
                />
            </div>
        </div>
        <div className={`auth-button ${styles.btnWrap}`}>
            <Button type={'primary'} size={'large'} onClick={handleSubmitResetPassword}>Xác nhận</Button>
        </div>
    </div>
}
