'use client'

import {Input, InputRef} from "antd";
import './styles.scss'
import {ChangeEventHandler, useEffect, useRef, useState} from "react";
import styles from './styles.module.scss'

interface InputProps {
    label: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    isPasswordInput?: boolean,
    isRequired?: boolean,
    disabled?: boolean
}

export default function InputWithLabel(
    {
        label,
        value,
        onChange,
        isPasswordInput = false,
        isRequired = false,
        disabled = false
    }: InputProps) {
    const [isInputActive, setIsInputActive] = useState<boolean>(false)
    const inputRef = useRef<InputRef>(null)

    useEffect(() => {
        if (isInputActive && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isInputActive])

    return <div className={'custom-input-with-label'}>
        {
            isPasswordInput ?
                <Input.Password
                    disabled={disabled}
                    ref={inputRef}
                    onFocus={() => setIsInputActive(true)}
                    onBlur={() => setIsInputActive(false)}
                    value={value}
                    onChange={onChange}
                /> :
                <Input
                    disabled={disabled}
                    ref={inputRef}
                    onFocus={() => setIsInputActive(true)}
                    onBlur={() => setIsInputActive(false)}
                    value={value}
                    onChange={onChange}
                />
        }
        <div className={(isInputActive || value) ? 'active-label' : 'custom-label'}
             onClick={() => setIsInputActive(true)}
             onBlur={() => setIsInputActive(false)}
        >
            {label} {isRequired ? <span className={styles.required}>*</span> : ''}
        </div>
    </div>
}
