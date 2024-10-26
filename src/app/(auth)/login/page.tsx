'use client'

import React, {useEffect, useState} from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import Logo from '../../../../public/logo.png'
import InputWithLabel from "@/components/InputWithLabel";
import {Button} from "antd";
import '../styles.scss'
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/configureStore";
import {setErrorLogin} from "@/store/slices/auth";
import ErrorMessage from "@/components/ErrorMessage";
import {useRouter, useSearchParams} from "next/navigation";
import {getNotification, handleCheckValidateConfirm, IValidationResult} from "../../../../utils/helper";
import {handleLoginResult} from "@/actions/auth";
import {SERVER_ERROR_MESSAGE} from "../../../../utils/constants";
import GoogleLogin from "@/app/(auth)/components/GoogleLogin";

export default function Login(): JSX.Element {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        account_role: 'user'
    })
    const [isLoadingRequestLogin, setIsLoadingRequestLogin] = useState<boolean>(false)
    const errorLogin = useSelector((state: RootState) => state.auth.errorLogin)
    const dispatch: AppDispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChangeInput = (value: string, type: string): void => {
        dispatch(setErrorLogin({
            ...errorLogin,
            [type]: ''
        }))

        setLoginData({
            ...loginData,
            [type]: value
        })
    }

    const handleRequestLogin = (): void => {
        const formValidation: IValidationResult = handleCheckValidateConfirm(loginData, errorLogin)
        if (formValidation.isError) {
            dispatch(setErrorLogin(formValidation.errorData))
        } else {
            setIsLoadingRequestLogin(true)
            handleLoginResult(loginData)
                .then(res => {
                    setIsLoadingRequestLogin(false)
                    switch (res.status) {
                        case 200:
                            getNotification('success', 'Đăng nhập thành công')
                            if (searchParams.get('redirect')) {
                                router.push(`/${searchParams.get('redirect')}`)
                            } else {
                                router.push('/')
                            }
                            break;
                        case 401:
                            getNotification('error', 'Email hoặc mật khẩu không đúng')
                            break;
                        case 403:
                            getNotification('error', 'Tài khoản của bạn đã bị khóa')
                            break;
                        case 500:
                            getNotification('error', SERVER_ERROR_MESSAGE)
                            break;
                        default:
                            getNotification('error', SERVER_ERROR_MESSAGE)
                            break;
                    }
                })
                .catch(err => {
                    setIsLoadingRequestLogin(false)
                    getNotification('error', SERVER_ERROR_MESSAGE)
                })
        }
    }

    useEffect(() => {
        dispatch(setErrorLogin({
            email: '',
            password: ''
        }))
    }, [dispatch])

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
                {errorLogin.email ? <ErrorMessage message={errorLogin.email}/> : ''}
            </div>
            <div className={styles.inputWrap}>
                <InputWithLabel
                    isRequired
                    isPasswordInput
                    label={'Mật khẩu'}
                    value={loginData.password}
                    onChange={e => handleChangeInput(e.target.value, 'password')}
                />
                {errorLogin.password ? <ErrorMessage message={errorLogin.password}/> : ''}
            </div>
        </div>
        <div className={styles.forgotPasswordWrap}>
            <div className={styles.forgot}>
                <Link href={'/forgot-password'}>Quên mật khẩu?</Link>
            </div>
        </div>
        <div className={`auth-button ${styles.btnWrap}`}>
            <Button type={'primary'} size={'large'} onClick={handleRequestLogin} loading={isLoadingRequestLogin}>
                Đăng nhập
            </Button>
        </div>
        <div className={styles.noAccountWrap}>
            Bạn chưa có tài khoản? <Link className={styles.registerBtn} href={'/register'}>Đăng ký</Link>
        </div>

        <GoogleLogin/>

        <Link className={'mt-4 text-[15px] flex justify-center'} href={'/admin/login'}>
            Đăng nhập với tài khoản quản trị viên
        </Link>
    </div>
}