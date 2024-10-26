import {AxiosResponse} from "axios";
import {apiAxios} from "@/api/callApi";
import {IChangePasswordData} from "@/app/(main)/profile/type";

export const requestGetProfile = async (): Promise<AxiosResponse> => {
    return apiAxios({
        method: 'get',
        url: 'user/get-profile'
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
