export const SERVER_ERROR_MESSAGE: string = 'Đã có lỗi xảy ra, vui lòng thử lại sau'
export const AUTH_ROUTES: string[] = ['/login', '/register', '/forgot-password', '/reset-password']
export const PROTECTED_ROUTES: string[] = ['/profile']
export const PER_PAGE = 20
export const ACCOUNT_TYPE = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    USER: 'user'
}
export const DISPLAY_ADMIN_TYPE = {
    [ACCOUNT_TYPE.SUPER_ADMIN]: 'Super Admin',
    [ACCOUNT_TYPE.ADMIN]: 'Admin'
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

export const CATEGORY_VISIBLE_ACTION = {
    HIDE: 'hide',
    SHOW: 'show'
}

export const GENDER = {
    MALE: {
        VALUE: 'male',
        LABEL: 'Bé trai',
        TAG_COLOR: 'cyan'
    },
    FEMALE: {
        VALUE: 'female',
        LABEL: 'Bé gái',
        TAG_COLOR: 'orange'
    }
}

export const POST_STATUS = {
    PENDING: {
        VALUE: 'pending',
        LABEL: 'Đang chờ duyệt',
        TAG_COLOR: ''
    },
    APPROVED: {
        VALUE: 'approved',
        LABEL: 'Đang hiển thị',
        TAG_COLOR: ''
    },
    REJECTED: {
        VALUE: 'rejected',
        LABEL: 'Đã bị từ chối',
        TAG_COLOR: ''
    },
    HIDDEN: {
        VALUE: 'hidden',
        LABEL: 'Đã ẩn',
        TAG_COLOR: ''
    },
    DRAFT: {
        VALUE: 'draft',
        LABEL: 'Bản nháp',
        TAG_COLOR: ''
    },
    DONE: {
        VALUE: 'done',
        LABEL: 'Hoàn thành',
        TAG_COLOR: ''
    },
    EXPIRED: {
        VALUE: 'expired',
        LABEL: 'Đã hết hạn',
        TAG_COLOR: ''
    }
}

export const PRODUCT_CONDITION: any = {
    NEW: {
        VALUE: 'new',
        LABEL: 'Mới (New)',
        TAG_COLOR: 'cyan'
    },
    LIKE_NEW: {
        VALUE: 'like_new',
        LABEL: 'Đã qua sử dụng (Like new)',
        TAG_COLOR: 'blue'
    },
    USED: {
        VALUE: 'used',
        LABEL: 'Cũ (Used)',
        TAG_COLOR: 'orange'
    }
}

export const LOCALSTORAGE_DEFAULT_CHAT_USER = 'default_chat_user'
