'use server'

import {ILoginData, requestLogin} from "@/api/auth";
import {setAuthProfile, setAuthToken} from "../../utils/cookie/server";

export async function handleLoginResult(data: ILoginData): Promise<any> {
    return await requestLogin(data)
        .then((res) => {
            setAuthToken(res.data?.token)
            setAuthProfile(res.data?.user)
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
