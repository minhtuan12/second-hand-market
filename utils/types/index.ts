import React from "react";
import dayjs from "dayjs";

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
    rating?: number,
    username?: string,
    role?: string,
    wishlist?: string[]
}

export type Baby = {
    _id?: string,
    firstname: string,
    lastname: string,
    birthdate: string | null | dayjs.Dayjs,
    parent_id?: string,
    gender: string,
    weight: number | null,
    height: number | null,
    createdAt?: string,
    updatedAt?: string,
    is_deleted?: boolean
}

export type AdminProfile = {
    _id: string,
    username: string,
    firstname: string,
    lastname: string,
    email?: string,
    avatar: string,
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
    updatedAt?: string,
    order?: number
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

export interface IChildren {
    children: React.ReactNode,
    classname?: string
}

export type Product = {
    _id?: string,
    description: string | null,
    images: any,
    price: number | null,
    condition: string,
    category_id: string | null
    createdAt?: string,
    updatedAt?: string,
    product_attributes?: { _id?: string, attribute_id?: string, value: string | null | [] }[]
}

export type Post = {
    _id?: string,
    title: string | null,
    poster_id?: string,
    product_id?: string,
    status?: string,
    location: {
        city: string | null,
        district: string | null
    },
    is_draft?: boolean,
    createdAt?: string,
    updatedAt?: string,
    is_deleted?: boolean,
    product?: Product
}

export type Conversation = {
    _id?: string,
    participants: string[],
    latest_mentioned_post_id: string,
    is_deleted: boolean,
    participant?: UserProfile
}
