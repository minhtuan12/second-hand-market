'use server'

import {ILoginData, requestGetNewTokens, requestLogin} from "@/api/auth";
import {
    deleteAllCookies,
    getCookieValue,
    setAuthProfile,
    setAuthToken,
    setRefreshToken
} from "../../utils/cookie/server";
import {requestGetProfile} from "@/api/profile";
import {SERVER_REFRESH_TOKEN} from "../../utils/cookie/constants";
import {AxiosResponse} from "axios";
import {cookies} from "next/headers";

export async function handleLoginResult(data: ILoginData): Promise<any> {
    return requestLogin(data)
        .then(async (res) => {
            await setAuthToken(res.data?.access_token)
            await setRefreshToken(res.data?.refresh_token)
            await handleGetProfile()
            return {
                status: res.status,
                data: res.data
            }
        })
        .catch(err => {
            return {
                status: err.response.status,
                message: err.response.data
            }
        })
}

export async function handleGetProfile(): Promise<any> {
    return requestGetProfile()
        .then(res => {
            setAuthProfile(res.data)
            return res.data
        })
        .catch(err => {
            return {
                status: err.status,
                data: err.response?.data
            }
        })
}

export async function handleGetNewTokens(): Promise<any> {
    const refreshToken: string = await getCookieValue(SERVER_REFRESH_TOKEN)

    return requestGetNewTokens(refreshToken)
        .then((res: AxiosResponse): void => {
            setAuthToken(res.data.access_token)
            setRefreshToken(res.data.refresh_token)
        })
        .catch((): void => {
            deleteAllCookies()
        })
}

export async function setCookie(name: string, value: string): Promise<any> {
    return cookies().set(name, value)
}

export async function handleLogout() {
    return deleteAllCookies()
}
