import {validate} from "./validations/generalValidation";
import {toast} from "react-toastify";

export const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_.+-]{1,}@[a-z0-9]{1,}(\.[a-z0-9]{1,}){1,2}$/
export const VALIDATE_PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,50}$/
export const VALIDATE_PHONE_REGEX_RULE = /^[0-9]{3}[0-9]{3}[0-9]{4}$/

export const isValidEmail = (email: string) => {
    let result = false
    if (email) {
        const regex = RegExp(VALIDATE_EMAIL_REGEX);
        result = regex.test(email.trim())
    }
    return result
}


export const isValidPassword = (password: string) => {
    let result = false
    if (password) {
        const regex = RegExp(VALIDATE_PASSWORD_REGEX);
        result = regex.test(password.trim())
    }
    return result
}

export const isValidPhone = (phone: string) => {
    let result = false

    if (phone) {
        let trimPhone = phone.trim()

        if (trimPhone) {
            const regexRule = RegExp(VALIDATE_PHONE_REGEX_RULE);

            let ruleMatch = trimPhone.match(regexRule);

            if (ruleMatch && ruleMatch.length > 0) {
                result = (ruleMatch[0] === trimPhone)
            }
        }
    }
    return result
}

export interface IValidationResult {
    isError: boolean,
    errorData: object
}

export const handleCheckValidateConfirm = (data: object, errors: object, type?: string): {
    isError: boolean,
    errorData: object
} => {
    let error = false;
    let keys = Object.keys(data);
    let errorData = errors

    keys.map(key => {
        let validation
        switch (type) {
            default:
                validation = validate(data, errorData, key);
                break;
        }
        errorData = validation.error;
        if (validation.isError) {
            error = true;
        }
    })

    return {
        isError: error,
        errorData: errorData
    }
}

export const getNotification = (type: string, content: string, duration = 2500, align = "top-right") => {
    // @ts-ignore
    toast[type](content, {
        position: align,
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
};

export const capitalizeFirstLetter = (str: string | '' | null): string | null => {
    if (str) {
        const splitStr: string[] = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
    return str;
}

export const isPositiveInteger = (num: any): boolean => {
    return num >>> 0 === parseFloat(num);
}

export const handleExportTimeAgo = (isoString: string): string => {
    const date = new Date(isoString);
    const now = Date.now();
    const secondsPast = Math.floor((now - date.getTime()) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast} giây trước`;
    }
    const minutesPast = Math.floor(secondsPast / 60);
    if (minutesPast < 60) {
        return `${minutesPast} phút trước`;
    }
    const hoursPast = Math.floor(minutesPast / 60);
    if (hoursPast < 24) {
        return `${hoursPast} giờ trước`;
    }
    const daysPast = Math.floor(hoursPast / 24);
    if (daysPast < 7) {
        return `${daysPast} ngày trước`;
    }
    const weeksPast = Math.floor(daysPast / 7);
    if (weeksPast < 4) {
        return `${weeksPast} tuần trước`;
    }
    const monthsPast = Math.floor(daysPast / 30);
    if (monthsPast < 12) {
        return `${monthsPast} tháng trước`;
    }
    const yearsPast = Math.floor(daysPast / 365);
    return `${yearsPast} năm trước`;
}

export const handleRemoveVietnameseTones = (str: string | undefined): string => {
    return str ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D') : ''
}

export const handleGetLabelFromValue = (obj: any, value: string): { label: string, color: string } => {
    let label = '', foundedKey = ''
    Object.keys(obj).forEach(key => {
        if (obj[key]['VALUE'] === value) {
            foundedKey = key
            label = obj[key]['LABEL']
        }
    })
    return {label, color: obj[foundedKey]['TAG_COLOR']}
}

export const capitalizeOnlyFirstLetter = (str: string): string => {
    return (str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()).trim()
}
