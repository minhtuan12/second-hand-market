import {AxiosResponse} from "axios";
import {apiAxios, fetcher} from "@/api/callApi";
import {IChangePasswordData} from "@/app/(main)/profile/type";
import {Baby} from "../../utils/types";
import useSWR from "swr";

export const requestGetProfile = async (): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'get',
        url: 'user/get-profile'
    })
}

export const useFetchProfile = (onError: () => void) => {
    return useSWR('/user/get-profile', fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnMount: false,
        onError,
    })
}

export const requestUpdateProfile = async (data: any): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'patch',
        url: 'user/update',
        data
    })
}

export const requestUpdateAvatar = async (avatarFile: any): Promise<AxiosResponse> => {
    return apiAxios({
        headers: {
            "Content-Type": 'multipart/form-data'
        },
        method: 'patch',
        url: 'user/update-avatar',
        data: {
            file: avatarFile
        }
    })
}

export const requestChangePassword = async (data: IChangePasswordData): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'patch',
        url: 'auth/change-password',
        data: {
            oldPassword: data.currentPassword,
            newPassword: data.newPassword
        }
    })
}

export const requestGetKidsInfo = async (): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'get',
        url: 'baby/get-babies'
    })
}

export const requestAddKidInfo = async (baby: Baby): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'post',
        url: 'baby/create',
        data: {...baby}
    })
}

export const requestUpdateKidInfo = async (babyId: string, baby: Baby): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'patch',
        url: 'baby/create',
        data: {...baby}
    })
}
