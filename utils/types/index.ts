export type UserProfile = {
    _id: string,
    avatar: any,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    city: string,
    district: string,
    ward: string,
    address: string,
    follower_ids: UserProfile[],
    following_user_ids: UserProfile[],
    rating?: number
}

export type AdminProfile = {
    _id: string,
    username: string,
    role: string,
    is_active: boolean
}

export type Address = {
    city: string | null,
    district: string | null,
    ward: string | null,
    detail: string
}

export type SelectOption = {
    label: string,
    value: string
}

export type PaginationType = {
    currentPage: number,
    totalRecord: number,
    perPage: number
}

export type Filter = {
    q: string,
    page: number,
    pageSize: number,
    column: string,
    sortOrder: number
}

export type Attribute = {
    _id?: string,
    label: string,
    category_id?: string,
    initial_value: null | string[],
    input_type: string,
    is_deleted?: boolean,
    is_required: boolean,
    createdAt?: string,
    updatedAt?: string
}

export type Category = {
    _id?: string,
    name: string,
    description: string,
    createdAt?: string,
    updatedAt?: string,
    is_deleted?: boolean,
    attributes: Attribute[]
}