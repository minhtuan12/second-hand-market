'use client'

import React, {useState} from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import Logo from '../../../../public/logo.png'
import InputWithLabel from "@/components/InputWithLabel";
import {Button} from "antd";
import '../styles.scss'
import Link from "next/link";

export default function Login(): JSX.Element {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChangeInput = (value: string, type: string): void => {
        setLoginData({
            ...loginData,
            [type]: value
        })
    }

    return <div className={styles.loginWrap}>
        <div className={styles.imageWrap}>
            <Image src={Logo} alt={'logo'} width={220} priority/>
        </div>
        <div className={styles.title}>
            Đăng nhập
        </div>
        <div className={styles.loginFormContent}>
            <div className={styles.inputWrap}>
                <InputWithLabel
                    isRequired
                    label={'Email'}
                    value={loginData.email}
                    onChange={e => handleChangeInput(e.target.value, 'email')}
                />
            </div>
            <div className={styles.inputWrap}>
                <InputWithLabel
                    isRequired
                    isPasswordInput
                    label={'Mật khẩu'}
                    value={loginData.password}
                    onChange={e => handleChangeInput(e.target.value, 'password')}
                />
            </div>
        </div>
        <div className={styles.forgotPasswordWrap}>
            <div className={styles.forgot}>
                <Link href={'/forgot-password'}>Quên mật khẩu?</Link>
            </div>
        </div>
        <div className={`auth-button ${styles.btnWrap}`}>
            <Button type={'primary'} size={'large'}>Đăng nhập</Button>
        </div>
        <div className={styles.noAccountWrap}>
            Bạn chưa có tài khoản? <Link className={styles.registerBtn} href={'/register'}>Đăng ký</Link>
        </div>
        <div className={styles.googleLoginWrap}>
            <div className={styles.option}>Hoặc</div>
            <div className={styles.btnLoginWithGoogle}>
                <Button
                    onClick={() => {
                    }}
                    className={styles.btnGoogleWrap}
                >
                    <div className={styles.googleImageWrap}>
                        <Image
                            priority
                            width={80}
                            height={30}
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google Logo"
                            className={styles.googleImage}
                        />
                    </div>
                    Đăng nhập bằng Google
                </Button>
            </div>
        </div>
    </div>
}
