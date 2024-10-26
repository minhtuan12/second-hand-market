'use client'

import {useEffect, useState} from "react";
import {AdminProfile, UserProfile} from "../types";
import {getCookieValue} from "../cookie/server";
import {SERVER_REFRESH_TOKEN, SERVER_USER_PROFILE} from "../cookie/constants";
import {handleGetProfile, handleLogout} from "@/actions/auth";
import {useRouter} from "next/navigation";

export const useAuthUser = () => {
    const [authUser, setAuthUser] = useState<UserProfile | AdminProfile | null>(null)
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCookieValue(SERVER_USER_PROFILE).then(async (res) => {
            if (res) {
                setLoading(false)
                setAuthUser(JSON.parse(res))
            } else {
                const hasRefreshToken = await getCookieValue(SERVER_REFRESH_TOKEN)
                if (hasRefreshToken) {
                    handleGetProfile()
                        .then(user => {
                            setLoading(false)
                            setAuthUser(user)
                        })
                        .catch(() => {
                            handleLogout()
                            router.push('/login')
                        })
                } else {
                    setLoading(false)
                    setAuthUser(null)
                }
            }
        })
    }, [])

    return {loading, authUser}
}
