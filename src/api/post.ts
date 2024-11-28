import {AxiosResponse} from "axios";
import {apiAxios, fetcher} from "@/api/callApi";
import {Post} from "../../utils/types";
import {POST_STATUS} from "../../utils/constants";
import useSWR from "swr";

export const requestUploadPostImage = async (images: any[]): Promise<AxiosResponse> => {
    return apiAxios({
        headers: {
            "Content-Type": 'multipart/form-data'
        },
        method: 'post',
        url: 'post/images-upload',
        data: {images}
    })
}

export const requestSaveDraftOrPost = async (post: Post): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'post',
        url: 'post/create',
        data: {post}
    })
}

export const requestUpdatePost = async (postId: string, post: Post): Promise<any> => {
    if (postId) {
        return apiAxios({
            method: 'put',
            url: `post/update/${postId}`,
            data: {post}
        })
    }
}

export const requestGetPost = async (id: string): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'get',
        url: `post/${id}`
    })
}

export const useFetchMyPosts = (
    status: string,
    {
        search,
        page,
        column,
        sort_order
    }: {
        search?: string,
        page: number,
        column?: string,
        sort_order?: number
    }, onError: () => void
) => {
    let url: string = status ? `post/get-own-post?status=${status}` : `post/get-own-post?status=${POST_STATUS.APPROVED.VALUE}`
    url += search ? `&search=${search}` : ''
    url += page ? `&page=${page}` : ''
    url += column ? `&column=${column}` : ''
    url += sort_order ? `&sort_order=${sort_order}` : ''

    return useSWR(url, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        onError,
        revalidateOnMount: true
    })
}

export const requestChangePostVisibility = async (postId: string, isVisibility: boolean): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'patch',
        url: `post/${postId}/visibility`,
        data: {is_visibility: isVisibility}
    })
}

export const useFetchAllPosts = (
    {
        search,
        page,
        column,
        sort_order
    }: {
        search: string,
        page: number,
        column: string,
        sort_order: number
    }, onError: () => void
) => {
    let url: string = `public/posts?page=${page}`
    url += search ? `&search=${search}` : ''
    url += column ? `&column=${column}` : ''
    url += sort_order ? `&sort_order=${sort_order}` : ''

    return useSWR(url, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        onError,
        revalidateOnMount: true
    })
}
