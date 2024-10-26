'use client'

import React, {useEffect} from "react";
import {setBreadcrumb, setPageTitle} from "@/store/slices/app";
import {useDispatch} from "react-redux";

export default function Admin() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle('Tổng quan'))
        dispatch(setBreadcrumb([
            {
                path: '/admin',
                name: 'Tổng quan'
            }
        ]))
    }, [])

    return <div>Toongr quan</div>
}
