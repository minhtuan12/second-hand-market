'use client'

import React, {useEffect, useState} from "react";
import {useFetchAllPosts} from "@/api/post";
import {useSelector} from "react-redux";
import {RootState} from "@/store/configureStore";
import {Skeleton} from "antd";
import PostItem from "@/app/(main)/components/PostItem";

export default function MoreLoadedPosts({regions}: {regions: any}) {
    const [filter, setFilter] = useState({
        page: 2,
        column: 'createdAt',
        sort_order: -1
    })
    const {searchKey, isSearched} = useSelector((state: RootState) => state.app)

    const {
        data: postsData,
        isLoading: loadingGetPosts,
        mutate: getAllPosts
    } = useFetchAllPosts({
        search: searchKey,
        page: filter.page,
        column: filter.column,
        sort_order: filter.sort_order
    }, () => {
    })

    useEffect(() => {
        if (isSearched) {
            getAllPosts()
        }
    }, [filter, searchKey, isSearched])

    if (loadingGetPosts) {
        return <Skeleton/>
    }

    return <div>
        {
            postsData?.posts?.map((item: any) => (
                <PostItem post={item} key={item?._id} regions={regions}/>
            ))
        }
    </div>
}
