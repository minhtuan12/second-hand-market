export const SERVER_ERROR_MESSAGE: string = 'Đã có lỗi xảy ra, vui lòng thử lại sau'
export const AUTH_ROUTES: string[] = ['/login', '/register', '/forgot-password', '/reset-password']
export const PROTECTED_ROUTES: string[] = ['/profile']
export const PER_PAGE = 20
export const ACCOUNT_TYPE = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    USER: 'user'
}
export const ATTRIBUTE_INPUT_TYPE = {
    TEXT: {
        LABEL: 'Nhập chuỗi',
        VALUE: 'text',
        TAG_COLOR: 'magenta'
    },
    DROPDOWN: {
        LABEL: 'Chọn một giá trị',
        VALUE: 'dropdown',
        TAG_COLOR: 'volcano'
    },
    RADIO: {
        LABEL: 'Chọn một giá trị',
        VALUE: 'radio',
        TAG_COLOR: 'volcano'
    },
    CHECKBOX: {
        LABEL: 'Chọn nhiều giá trị',
        VALUE: 'checkbox',
        TAG_COLOR: 'orange'
    },
    FILE_UPLOAD: {
        LABEL: 'File',
        VALUE: 'file_upload',
        TAG_COLOR: 'geekblue'
    },
    DATE: {
        LABEL: 'Ngày',
        VALUE: 'date',
        TAG_COLOR: 'cyan'
    },
    TIME: {
        LABEL: 'Giờ',
        VALUE: 'time',
        TAG_COLOR: 'cyan'
    },
    COLOR_PICKER: {
        LABEL: 'Chọn màu',
        VALUE: 'color_picker',
        TAG_COLOR: 'blue'
    },
}

export const ADDABLE_INPUT_TYPE = [
    ATTRIBUTE_INPUT_TYPE.CHECKBOX.VALUE,
    ATTRIBUTE_INPUT_TYPE.RADIO.VALUE,
    ATTRIBUTE_INPUT_TYPE.DROPDOWN.VALUE
]
