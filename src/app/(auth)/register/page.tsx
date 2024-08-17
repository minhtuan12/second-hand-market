'use client'

import React, {useState} from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import Logo from '../../../../public/logo.png'
import InputWithLabel from "@/components/InputWithLabel";
import {Button, Checkbox} from "antd";
import '../styles.scss'
import Link from "next/link";

export default function Register(): JSX.Element {
    const [termsCheckbox, setTermCheckbox] = useState(true)
    const [registerData, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        password: ''
    })

    const handleChangeInput = (value: string, type: string): void => {
        setRegisterData({
            ...registerData,
            [type]: value
        })
    }

    return <div className={styles.registerWrap}>
        <div className={styles.imageWrap}>
            <Image src={Logo} alt={'logo'} width={220} priority/>
        </div>
        <div className={styles.title}>
            Đăng ký tài khoản
        </div>
        <div className={styles.registerFormContent}>
            <div className={styles.nameInput}>
                <div className={styles.halfInput}>
                    <InputWithLabel
                        isRequired
                        label={'Họ'}
                        value={registerData.first_name}
                        onChange={e => handleChangeInput(e.target.value, 'first_name')}
                    />
                </div>
                <div className={styles.halfInput}>
                    <InputWithLabel
                        isRequired
                        label={'Tên'}
                        value={registerData.last_name}
                        onChange={e => handleChangeInput(e.target.value, 'last_name')}
                    />
                </div>
            </div>
            <div className={styles.inputWrap}>
                <InputWithLabel
                    isRequired
                    label={'Email'}
                    value={registerData.email}
                    onChange={e => handleChangeInput(e.target.value, 'email')}
                />
            </div>
            <div className={styles.inputWrap}>
                <InputWithLabel
                    isRequired
                    isPasswordInput
                    label={'Mật khẩu'}
                    value={registerData.password}
                    onChange={e => handleChangeInput(e.target.value, 'password')}
                />
            </div>
        </div>
        <div className={`${styles.termsOfUse} custom-checkbox`}>
            <Checkbox checked={termsCheckbox} onChange={e => setTermCheckbox(e.target.checked)}>
                Đồng ý với <Link href={'/terms-of-use'} target={'_blank'}>Điều khoản sử dụng</Link>
            </Checkbox>
        </div>
        <div className={`auth-button ${styles.btnWrap}`}>
            <Button type={'primary'} size={'large'}>Đăng ký</Button>
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
        <div className={styles.hasAccountOption}>
            Bạn đã có tài khoản? <Link href={'/login'}>Đăng nhập ngay</Link>
        </div>
    </div>
}
