'use server'

import {cookies} from "next/headers";
import {SERVER_AUTH_TOKEN, SERVER_USER_PROFILE} from "./constants";

export const setAuthToken = async (token: string) => {
    return cookies().set({
        name: SERVER_AUTH_TOKEN,
        value: token
    });
}

export const setAuthProfile = async (userProfile: object) => {
    return cookies().set({
        name: SERVER_USER_PROFILE,
        value: JSON.stringify(userProfile)
    });
}
